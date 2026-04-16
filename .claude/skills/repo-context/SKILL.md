# Repo Context — xolto-landing (www.xolto.app)

## What this repo is

Marketing landing page for xolto — an AI copilot for buying used electronics. Single-page Next.js 14 App Router site. Deployed on Vercel.

## Stack

- Next.js 14.2.0 (App Router)
- React 18, TypeScript 5.4
- Tailwind CSS v4 (via @tailwindcss/postcss)
- Sentry for error tracking
- Vercel Analytics
- pnpm package manager
- Fonts: Sora (body) + Outfit (headings) via next/font

## Key files

- `app/page.tsx` — main landing page, composes all sections
- `app/layout.tsx` — root layout, font setup, metadata
- `app/globals.css` — Tailwind v4 theme, custom component classes, animations
- `components/landing/` — Hero, Nav, Features, HowItWorks, Pricing, Footer, LogoMark, SectionHeading, SectionKicker

## Routes

Single page only. No client-side routing beyond anchor links to sections.
SEO files: `robots.ts`, `sitemap.ts`, `opengraph-image.tsx`, `twitter-image.tsx`.

## Brand

- Primary green: `#0f8f67`
- Bright accent: `#17c88e`
- Dark canvas: `#080f0c`
- Surface cards: `#0e1a15`, `#122019`
- Light text (ink): `#f0faf6`

## Commands

```
npm run dev         # dev server on port 3001
npm run build       # production build
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
npm run format      # Prettier
```

## Conventions

- Use next/font for all typography — never load fonts via <link> or @import
- Use Tailwind utility classes; custom classes go in globals.css @layer components
- Keep components in `components/landing/`
- CTAs link to the app at the URL from `NEXT_PUBLIC_APP_URL` env var
- Pricing tiers: Free (€0), Pro (€9/mo), Power (€29/mo)
- Copy should be concise, wedge-focused ("buy used electronics without overpaying")

## Do not

- Hardcode app/API URLs — use env vars
- Add new pages without explicit request
- Modify Sentry config unless asked
- Break existing animations (score-fill, glow-pulse, reveal-in)

## Definition of done

1. `npm run build` passes
2. CTA links point to correct app URLs
3. Typography and icons use the shared brand system (next/font, LogoMark)
4. No horizontal overflow on mobile widths
5. Copy still uses mission-first language
