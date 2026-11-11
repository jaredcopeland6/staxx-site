// staxxbooks.com/b/<book id>/<title>/ : the shared book page (O-136).
//
// Cloudflare runs this only for /b/... addresses (wrangler.jsonc,
// run_worker_first); every other page is the static site, unchanged.
// For a book it asks the database for the public summary (share_book(), which
// returns book information only, and Staxx's average only from 5+ readers),
// fills the /b/ template's title, description and link-preview tags, puts the
// data in the page for its script to draw, and caches the result for an hour,
// so most opens never reach the database.
//
// Needs two settings in Cloudflare (Workers > staxx-site > Settings):
//   SUPABASE_URL        the project URL (a plain variable, in wrangler.jsonc)
//   SUPABASE_ANON_KEY   the public anon key, the same one inside the app
//                       (added as a Secret in the dashboard, never in git)

const SITE = 'https://staxxbooks.com';
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const CACHE_SECONDS = 3600;

// The same headers public/_headers gives the static pages.
const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy': "frame-ancestors 'none'",
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

/** "Fourth Wing" -> "fourth-wing". Keep in step with bookSlug() in storee-app lib/bookLink.js. */
export function bookSlug(title) {
  const s = String(title ?? '')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
    .replace(/-+$/g, '');
  return s || 'book';
}

/** The link-preview line: Staxx's average when there is one, then the vibe words. */
export function previewDescription(book) {
  const parts = [];
  if (book.readers != null && book.average != null) {
    parts.push(`${Number(book.average).toFixed(1)} from ${book.readers} Staxx readers`);
  }
  if (Array.isArray(book.vibe_words) && book.vibe_words.length) parts.push(book.vibe_words.join(' · '));
  return parts.length ? parts.join(' · ') : "See what it's like, and what you'd score it, on Staxx.";
}

/** JSON that is safe inside <script>: no "</script>", no line separators. */
export function scriptJson(value) {
  const LS = String.fromCharCode(0x2028);
  const PS = String.fromCharCode(0x2029);
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .split(LS).join('\\u2028')
    .split(PS).join('\\u2029');
}

function setContent(content) {
  return { element: (e) => e.setAttribute('content', content) };
}

async function fetchBook(id, env) {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/rpc/share_book`, {
    method: 'POST',
    headers: {
      apikey: env.SUPABASE_ANON_KEY,
      Authorization: `Bearer ${env.SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ p_book_id: id }),
  });
  if (!res.ok) throw new Error(`share_book ${res.status}`);
  return res.json();
}

async function render(id, url, env) {
  let book;
  try {
    book = await fetchBook(id, env);
  } catch (err) {
    console.error('[book page]', err);
    // The database or the key: show the page without a book, uncached.
    const tpl = await env.ASSETS.fetch(new Request(new URL('/b/', url.origin)));
    return new Response(tpl.body, {
      status: 503,
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', ...SECURITY_HEADERS },
    });
  }

  if (!book) {
    const notFound = await env.ASSETS.fetch(new Request(new URL('/404/', url.origin)));
    return new Response(notFound.body, {
      status: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300', ...SECURITY_HEADERS },
    });
  }

  const canonical = `${SITE}/b/${book.id}/${bookSlug(book.title)}/`;
  const title = `${book.title}${book.author ? ` by ${book.author}` : ''} · Staxx`;
  const description = previewDescription(book);
  // Open Library's cover for previews: Apple's artwork needs its Books badge
  // beside it (O-81), which a preview picture can't carry.
  const image = book.cover_fallback_url || `${SITE}/og.png`;

  const tpl = await env.ASSETS.fetch(new Request(new URL('/b/', url.origin)));
  const page = new HTMLRewriter()
    .on('title', { element: (e) => e.setInnerContent(title) })
    .on('meta[name="description"]', setContent(description))
    .on('meta[property="og:title"]', setContent(title))
    .on('meta[property="og:description"]', setContent(description))
    .on('meta[property="og:url"]', setContent(canonical))
    .on('meta[property="og:image"]', setContent(image))
    .on('meta[property="og:image:alt"]', setContent(`Cover of ${book.title}`))
    // The size tags describe the site's own picture, not a book cover.
    .on('meta[property="og:image:width"]', { element: (e) => e.remove() })
    .on('meta[property="og:image:height"]', { element: (e) => e.remove() })
    .on('meta[name="twitter:card"]', setContent('summary'))
    .on('link[rel="canonical"]', { element: (e) => e.setAttribute('href', canonical) })
    .on('script#book-data', { element: (e) => e.setInnerContent(scriptJson(book), { html: true }) })
    .transform(tpl);

  return new Response(page.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': `public, max-age=${CACHE_SECONDS}`,
      ...SECURITY_HEADERS,
    },
  });
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const match = url.pathname.match(/^\/b\/([^/]+)(?:\/[^/]*)?\/?$/);
    // /b/ itself, and anything that isn't a book id, is the static site's.
    if (!match || !UUID.test(match[1])) return env.ASSETS.fetch(request);
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
    }

    const id = match[1].toLowerCase();
    // One cache entry per book, whatever title the link carries.
    const cacheKey = new Request(`${url.origin}/b/${id}/`, { method: 'GET' });
    const cache = caches.default;
    const hit = await cache.match(cacheKey);
    if (hit) return hit;

    const res = await render(id, url, env);
    if (res.status === 200 || res.status === 404) ctx.waitUntil(cache.put(cacheKey, res.clone()));
    return res;
  },
};
