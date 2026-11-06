# staxxbooks.com

The Staxx website: the homepage, Terms, Privacy and Support. Built with
[Astro](https://astro.build) and hosted on Cloudflare.

## Changing the words

- **The easy way:** sign in at [app.pagescms.org](https://app.pagescms.org) with
  GitHub, open this repository, then edit **Homepage** or **Terms, Privacy and
  Support** and press Save. The live site updates about a minute later.
- **By hand:** homepage text is in `src/data/home.json`; the legal pages are
  Markdown files in `src/content/pages/`.

When you change Terms or Privacy, also change its **Last updated** date.

## Where things live

| What | Where |
|---|---|
| Homepage layout | `src/pages/index.astro` |
| Terms / Privacy / Support layout | `src/pages/[page].astro` |
| Colours and spacing | `src/styles/global.css` (the app's own palette) |
| Drawn phone screens | `src/components/Mockup.astro` |
| Waitlist form | `src/components/WaitlistForm.astro`, posting to the `join-waitlist` Edge Function in storee-app |
| Waitlist settings (public) | `src/data/site.json` |
| Save Password file for the app | `public/.well-known/apple-app-site-association` (must stay) |
| Cloudflare hosting settings | `wrangler.jsonc`, `public/_headers` |

## Running it on a Mac

```
npm install
npm run dev     # http://localhost:4321
npm run build   # what Cloudflare runs
```
