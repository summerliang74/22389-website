# AE86 FTC 22389 Website

The site is a statically generated Vue 3 application built with Vite, Vue Router and Vite SSG. It preserves the original visual design, content, public routes and Cloudflare Workers deployment while keeping every route readable without client-side JavaScript.

## Development

Requirements: Node.js 20.19+ (Node.js 22 or 24 recommended).

```bash
npm install
npm run dev
```

The local development address is printed by Vite, normally `http://localhost:5173`.

## Commands

- `npm run dev` — start the Vue development server.
- `npm run build` — create the production site in `dist/`.
- `npm run preview` — preview the production build locally.
- `npm run check` — build and verify all routes at desktop and mobile sizes.

## Structure

- `src/App.vue` — shared application shell.
- `src/router/` — public routes and per-page metadata.
- `src/components/` — shared header, contact dialog, footer and season layout.
- `src/views/` — the six site pages.
- `src/composables/usePageEffects.js` — scroll reveals and number animations with cleanup on route changes.
- `assets/` — original fonts, optimized images, sponsor logos and shared styles.
- `archive/static-v1/` — the pre-migration static HTML, retained as a reference.
- `dev/check-vue-site.mjs` — production browser checks.

## Public routes

- `/`
- `/uniform`
- `/seasons/powerplay`
- `/seasons/centerstage`
- `/seasons/into-the-deep`
- `/seasons/decode`

The Worker permanently redirects the former `.html` URLs to these canonical routes.

## Deployment

The project remains configured for Cloudflare Workers Static Assets. Each public route receives complete pre-rendered HTML and page-specific social/search metadata; SPA fallback keeps client-side routes working when opened directly.

```bash
npm run build
npx wrangler@4 deploy
```

Use `wrangler.preview.jsonc` when publishing to a temporary `workers.dev` address.
