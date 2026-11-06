// staxxbooks.com: the marketing site, Terms, Privacy and Support.
// Static output only. The browser version of the app will live at its own
// address (app.staxxbooks.com) so it never slows these pages down.
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://staxxbooks.com',
  // /privacy/ and /terms/ are already linked from the app and from App Store
  // Connect with a trailing slash; keep those addresses exactly.
  trailingSlash: 'always',
  build: { format: 'directory' },
  // og-card is only the source of the link-preview picture, not a real page.
  integrations: [sitemap({ filter: (page) => !page.includes('/og-card/') })],
  devToolbar: { enabled: false },
});
