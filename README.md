# Casa Esmeralda Ridge

Concept website for **Casa Esmeralda Ridge** by **Pura Vida Sloth Escapes**, a three-bedroom vacation rental with a private waterfall pool in the gated Arenas community, Herradura, Costa Rica. Spec demo by Lee Enterprises Unlimited. Front-end only.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start   # production build
```

Node 20 or newer.

## Modes

| Variable | Values | Effect |
|---|---|---|
| `NEXT_PUBLIC_SITE_MODE` | `demo` (default) / `live` | demo: `noindex, nofollow`, empty sitemap, concept line in the footer. live: `index, follow`, sitemap in robots.txt, no concept line. |
| `NEXT_PUBLIC_SITE_URL` | e.g. `https://casaesmeraldaridge.com` | Base for canonicals, Open Graph and JSON-LD. On Vercel it falls back to the deployment URL. |

Keep the deployed demo in demo mode. See `SEO-LAUNCH.md` for launch day.

## Where things live

- `lib/business.ts`: every business fact (WhatsApp number goes here; empty means "Message" opens Airbnb).
- `lib/copy.ts` (English) and `lib/copy-es.ts` (Spanish): all visible copy.
- `lib/gallery.ts`: the photo map, alt text and gallery filters. `lib/day.ts`: the six day-dial stops.
- `lib/schema.ts`: JSON-LD. `lib/site.ts`: the launch switch. `lib/contact.ts`: WhatsApp, SMS and fallback links.
- `components/sections/`: one file per section. `components/StayPlanner/`, `components/DayDial/`.
- `scripts/optimize-images.mjs` (`npm run images`): converts `public/images/raw/*.jpg` to WebP, writes `lib/photo-dims.json`, crops the badge, builds the favicon, Apple icon, hero poster and `public/og-image.png`.

## Images

All photos are the home's own Airbnb listing photos. The only AI-generated visuals are the approved Higgsfield files in `public/media/generated/` (made from the home's own pool photo 01). They are used only as the hero background (loop, poster, reduced-motion still) and in the Open Graph image.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. In Vercel, Add New Project, import the repo (framework preset: Next.js, no settings to change).
3. Leave `NEXT_PUBLIC_SITE_MODE` unset (demo). Optionally set `NEXT_PUBLIC_SITE_URL` to the preview domain.
4. Vercel Web Analytics turns on automatically on Vercel deployments (enable it in the project's Analytics tab).
