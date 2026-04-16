# Test and Verify — xolto-landing

Run this skill after making changes to verify nothing is broken.

## Steps

1. Run the build:

   ```
   npm run build
   ```

   If it fails, fix the errors before proceeding.

2. Run TypeScript check:

   ```
   npm run typecheck
   ```

3. Run lint:

   ```
   npm run lint
   ```

4. Run format check:

   ```
   npm run format:check
   ```

5. If any step fails, fix the issue and re-run from the beginning.

6. Confirm the following manually:
   - CTA links use `NEXT_PUBLIC_APP_URL` env var, not hardcoded URLs
   - No inline `<link>` or `@import` for fonts — only next/font
   - No hardcoded pricing values outside `components/landing/Pricing.tsx`

## When done

Report which checks passed and any issues found.
