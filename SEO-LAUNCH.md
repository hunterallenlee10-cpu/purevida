# Launch day checklist: Casa Esmeralda Ridge

The site ships in **demo mode** (noindex, nofollow, no sitemap, concept line in the footer). Flip it to live only when Melina has approved the site and the DRAFT items below are resolved.

## 1. Switch to live
- [ ] In Vercel, Project Settings, Environment Variables (Production):
  - `NEXT_PUBLIC_SITE_MODE=live`
  - `NEXT_PUBLIC_SITE_URL=https://<the-real-domain>` (no trailing slash)
- [ ] Add the domain in Vercel, Domains, and point DNS at Vercel.
- [ ] Redeploy (env vars are read at build time).

## 2. Confirm
- [ ] View source on `/` and `/contact`: `<meta name="robots" content="index, follow">`, the canonical uses the real domain.
- [ ] `/robots.txt` lists `Sitemap: https://<domain>/sitemap.xml`.
- [ ] `/sitemap.xml` lists `/` and `/contact` with last-modified dates (update `lastModified` in `lib/site.ts` when pages change).
- [ ] The footer no longer shows "Concept preview by Lee Enterprises Unlimited."
- [ ] Paste the URL into a WhatsApp chat and check the link preview (Open Graph image `public/og-image.png`).
- [ ] Run Lighthouse on the live URL: SEO 100, the rest 90+.
- [ ] Validate JSON-LD at https://validator.schema.org and https://search.google.com/test/rich-results.

## 3. Tell the search engines
- [ ] Google Search Console: add the domain property, verify by DNS, submit `sitemap.xml`, request indexing for `/`.
- [ ] Bing Webmaster Tools: import from Search Console or add the site, submit the sitemap.
- [ ] Create a Google Business Profile for the rental (service area: Herradura, Puntarenas; no street address shown) and link the site from it.
- [ ] Add the site link to the Instagram bio (@puravidaslothescapes), next to or instead of the Airbnb link.

## 4. Real data the site still needs (all marked DRAFT in the code)
- [ ] Melina's WhatsApp number: set `whatsapp` in `lib/business.ts` (8 digits or with 506). Every "Message" button and the planner's "Send on WhatsApp" and "Text instead" switch on automatically. Then add `telephone` to the VacationRental JSON-LD in `lib/schema.ts`.
- [ ] Geo coordinates (latitude and longitude) for the VacationRental JSON-LD. Google lists them as required for vacation rental rich results; a rounded value for the community is fine if the exact house should stay private.
- [ ] More images in the JSON-LD (Google recommends at least 8); add photo ids in `vacationRentalSchema()`.
- [ ] Pet policy and any fee (FAQ answer, planner "Bringing a pet?").
- [ ] AC in every bedroom (wall units are visible in the photos; also the `ac` amenity in JSON-LD).
- [ ] Airport drive times (not published anywhere on the site yet).
- [ ] Reply method and timing shown on the planner's thank-you screen.
- [ ] Permission to reuse the Arenas community photos (23 to 36) from the developer.
- [ ] Real photos to replace the labelled placeholders: a sloth seen from the property, the workspace, Melina and the team.
- [ ] The original logo file (the badge is currently cropped from a 194px Instagram screenshot, so it is never shown larger than 64px).
- [ ] Spanish proofread by Melina (`lib/copy.ts`, the `es` object).
- [ ] Our English translation of the Instagram review (Reviews section).
- [ ] Replace the AI-generated hero loop and still (`public/media/generated/`) with real footage when available.

## Known VacationRental warnings to expect until the data above exists
- Missing `latitude` / `longitude` (geo). Not invented on purpose.
- Fewer than 8 images.
- No `aggregateRating` / `review`: intentional, the reviews belong to Airbnb and are shown on the page with attribution.
