# xolto-landing

`xolto-landing` is the standalone Next.js marketing site for xolto.

## Wedge + tone

xolto is a used-electronics buying copilot. The wedge is the high-intent BG
used-tech buyer on OLX.bg, with pricing correctness in BGN as a P1 trust
constraint. The wedge replaced NL / Marktplaats on 2026-04-17; legacy NL
references remain but must not drive primary product decisions. The BG
category scope (cameras, laptops, phones, other) is an open question
resolved by the OLX BG trust audit — do not re-encode the retired
Marktplaats-era cameras + laptops bias in new copy.

Copy on this site is currently still **NL-first with EN as fallback** — a
legacy artifact of the prior wedge. Re-localization to BG-first is tracked
as a separate initiative; until it ships, do not add new NL-only marketing
language. Prefer EN when no BG copy is available. There is no i18n
infrastructure today (message catalog, router strategy) — add one as part
of the BG-first re-localization, not piecemeal.

## Requirements

- Node.js 18+
- npm

## Local setup

```bash
npm install
cp .env.example .env.local
```

## Environment variables

| Name                     | Required | Purpose                                                                                   |
| ------------------------ | -------- | ----------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_APP_URL`    | yes      | Origin for CTA links into the xolto app (defaults to `http://localhost:3000`).            |
| `NEXT_PUBLIC_SITE_URL`   | yes      | Public URL of the landing site, used for sitemap / robots / SEO metadata.                 |
| `NEXT_PUBLIC_SENTRY_DSN` | no       | Sentry client/server/edge DSN. **Silent no-op when unset** — instrumentation still loads. |
| `NEXT_PUBLIC_GIT_SHA`    | no       | Optional local override for the release identifier.                                       |
| `VERCEL_GIT_COMMIT_SHA`  | auto     | Auto-populated by Vercel; used as the default release identifier. Falls back to `dev`.    |

## Development

```bash
npm run dev
```

The landing site runs on `http://localhost:3001` by default.

## Production build

```bash
npm run build
npm run start
```

## Deployment

Deployed to Vercel at `www.xolto.app`.

## Release gate — viewports

Playwright acceptance for this repo is gated on **430×932** (large mobile) and
**768×1024** (tablet). These are the wider-viewport gates carried over from
XOL-14; any landing-page change that touches layout must be verified at both
sizes before merge.

## Formatting

Prettier is the formatter. Before pushing, run:

```bash
npm run format:check
```

to pre-satisfy the CI format check. If it fails, run `npm run format` to fix.
