# Landing UI Sweep — Test Architecture (XOL-171 cross-repo alignment)

## Summary

The landing site's Playwright UI sweep (`ui-sweep-2026-05.spec.ts`) tests against a **local production build** spun up fresh for each CI run, NOT against the deployed Vercel preview URL.

This is the architectural counterpart to admin and dash, which both target Vercel preview deployments. Both shapes are valid; landing uses local dev server because it's structurally simpler for a public marketing site with no auth requirements.

## How it works

`playwright.config.ts` declares a `webServer` block:

```ts
webServer: {
  command: 'pnpm build && pnpm start',
  url: 'http://localhost:3001',
  reuseExistingServer: !process.env.CI,
  timeout: 180_000,
},
```

On every CI run, Playwright builds the PR's checked-out code (`pnpm build`) and serves it locally (`pnpm start`). `baseURL` is `http://localhost:3001`, so all sweep navigations target this fresh local build.

This means **the sweep validates the PR's own code**, not the pre-merge deployed state. The chicken-egg pattern that motivated XOL-171 (sweep against deployed URL → fix on PR branch → main mismatch) **does not apply** to landing.

## Cross-repo XOL-171 alignment

| Repo                        | Sweep target                                                                                | Why                                                                                                                                             |
| --------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `xolto-admin`               | Vercel preview URL via `wait-for-vercel-preview` action + `VERCEL_AUTOMATION_BYPASS_SECRET` | Admin is SSO-protected on Vercel (preview + prod both gated). Targeting preview validates the PR's deploy.                                      |
| `xolto-app` (dash)          | Vercel preview URL (per XOL-177 + XOL-171 pattern)                                          | Dash auth happens at app-level; Vercel preview can be public. Same chicken-egg risk as admin without preview targeting.                         |
| `xolto-landing` (this repo) | Local production build (`pnpm build && pnpm start`)                                         | Public site, no auth surface. Local build is simpler than wiring Vercel preview URL polling, and structurally avoids chicken-egg by definition. |

## When this might change

If landing ever gains:

- Server-side data fetching that depends on the deployed environment (current state: static export from Next.js)
- Vercel-specific runtime behavior (edge functions, ISR, etc.) that diverges meaningfully between local prod build and deployed preview
- Authentication or other state requiring a real Vercel deploy to test

→ migrate to the Vercel-preview-URL pattern documented in admin's `__tests__/ui-sweep/README.md`. The tooling (`wait-for-vercel-preview` + `VERCEL_AUTOMATION_BYPASS_SECRET`) is reusable.

## Local testing

```bash
pnpm test:e2e
```

Playwright spins up the local server automatically. No env vars needed.

## CI workflow

`.github/workflows/ci.yml` includes a `playwright-test` job that runs `pnpm test:e2e` on every PR. The Class-5 overflow detector (XOL-168 framework — three contracts: `data-allow-overflow`, `data-overflow-pending-fix`, tag-class universal) gates merge.

## References

- XOL-171 (cross-repo sweep architecture decision)
- XOL-168 (Class-5 overflow detector framework)
- Admin counterpart: `xolto-admin/__tests__/ui-sweep/README.md`
- Vercel docs: "Protection Bypass for Automation" (relevant if migrating to preview URL pattern)
