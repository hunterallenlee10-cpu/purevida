# Casa Esmeralda Ridge: implementation kickstart

Concept site for **Casa Esmeralda Ridge** by **Pura Vida Sloth Escapes** (Arenas, Herradura, Costa Rica).
Spec demo by Lee Enterprises Unlimited. Front-end only. One goal: every action leads to **Check My Dates** (the Stay Planner), with **Book on Airbnb** as the always-visible second path.

## Plan

1. Assets: 41 real listing photos in `public/images/raw/` converted to `.webp` in `public/images/` by `scripts/optimize-images.mjs` (sharp). Generated hero loop and 4K still in `public/media/generated/` (AI-generated, approved by Hunter, hero only).
2. Stack: Next.js 15 App Router, TypeScript, Tailwind CSS v4, lucide-react, react-day-picker, @vercel/analytics. Fraunces is self-hosted (static optical size 144, 55 KB) via next/font/local; Hanken Grotesk via next/font/google. Motion is CSS-only (keyframes and transitions), confined to the hero waterline reveal and the day dial, so it starts on first paint and adds no JS weight.
3. Data lives in `lib/`: `business.ts` (facts), `copy.ts` (en + es), `gallery.ts`, `day.ts`, `site.ts` (launch switch), `contact.ts` (WhatsApp/Airbnb fallback links), `schema.ts` (JSON-LD).
4. One component per section in `components/sections/`, plus `components/StayPlanner/` and `components/DayDial/`. No file over 500 lines.
5. Launch switch: `NEXT_PUBLIC_SITE_MODE` (`demo` default, or `live`) and `NEXT_PUBLIC_SITE_URL`.

## Design tokens: "Esmeralda Dusk"

| Token | Value | Use |
|---|---|---|
| `limestone` | `#F5EFE4` | page background |
| `surface` | `#FBF8F1` | cards |
| `line` | `#E6DCCB` | 1px borders, arch keyline |
| `accent` | `#B5472F` | primary button, key numbers, active dial stop, focus rings, bio dots |
| `ink` | `#13291F` | text (13.4:1 on limestone) |
| `muted` | `#4F5E55` | secondary text (6.0:1) |
| `jungle` | `#1E3B2F` | dark bands |
| `accent-light` | `#F0957D` | accent on dark bands only (5.4:1) |
| `pool` | `#7FD3CF` | the 1px waterline in the hero reveal only |

- Fonts: Fraunces (display, variable, opsz on, one italic word per headline at most) and Hanken Grotesk (body).
- Arch: `border-radius: 999px 999px 24px 24px`, 1px `line` keyline 8px outside. Used in at most four places: hero side card, rooms tour, proof photo, final call to action.
- Cards: 20px radius, 1px border, hover shadow `0 12px 32px rgba(19,41,31,0.06)`.
- Spacing: 8px grid, sections 112 to 128px desktop, 72px mobile.
- Day dial tints (accent stays at AA on each): Morning `#FBF8F1`, Midday `#F8F2E6`, Afternoon `#F5EFE4`, Golden hour `#F5EDDF`, Sunset `#F4EBDC`, Night `#1E3B2F` (text flips to limestone, accent to `#F0957D`).

## Build checklist

- [x] Phase 1: scaffold, tokens, fonts, wordmark, nav, hero with the video loop and the waterline reveal, footer
- [x] Phase 2: private side and community side, A Day at Casa Esmeralda dial (six stops, auto-play once, keyboard)
- [x] Phase 3: rooms tour with arched frames, amenities, gallery with filters and lightbox
- [x] Phase 4: Arenas bento, proof, nearby strip, reviews band, FAQ, final call to action
- [x] Phase 5: Stay Planner with live bed diagram, pre-selects, WhatsApp and Airbnb fallback, mobile sticky bar, `/contact`
- [x] Phase 5b: EN | ES toggle with `lib/copy.ts`
- [x] Phase 6: launch switch, titles and descriptions, single h1, JSON-LD, robots, sitemap, `llms.txt`, OG image, favicon, 404, `SEO-LAUNCH.md`
- [x] Phase 6b: Lighthouse on a production build, live and demo, mobile and desktop
- [x] Phase 7: final review, commit, ready for GitHub and Vercel

## Final review checklist

- [x] Hero sells the stay; loop smooth; waterline reveal plays once; at 375px headline and primary button visible above the fold; poster instead of video on phones
- [x] Day dial: six real photos, mouse, touch, keyboard, auto-play once, AA at every stop, "Book this day" pre-selects trip type
- [x] Every "Check My Dates" opens the planner with the right pre-selects; bed diagram 1 to 6; WhatsApp message correct; empty number copies and opens Airbnb; every Airbnb link is the real listing
- [x] Every "only this home has" item present
- [x] Zero em dashes, zero "--", no stock or extra AI images, no `gen-` file outside the hero and OG image, no invented facts, no prices, no "beachfront"
- [x] DRAFT items labelled or commented
- [x] 2 fonts, 3 colours plus text, motion in 2 sections only
- [x] 375px: no overflow, burger works, sticky bar works
- [x] Footer on both pages; demo serves noindex and the concept line; live serves index, sitemap, no concept line
- [x] OG image and favicon are Casa Esmeralda's
- [x] Lighthouse: SEO 100 live; others 90+; demo only fails the indexing audit
- [x] One h1 per page with "vacation rental" and "Herradura"; unique titles and descriptions; JSON-LD valid and true
