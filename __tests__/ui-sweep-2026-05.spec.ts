import { test, expect } from '@playwright/test';

const ALLOWED_CONSOLE_NOISE = [/Sentry/i, /Download the React DevTools/i];

// Class-5 overflow detector: walks constrained-overflow and fixed/absolute-positioned
// elements to assert none overflow their parent horizontally.
interface OverflowOffender {
  tag: string;
  cls: string;
  id: string;
  sw: number;
  cw: number;
  overflow: string;
  position: string;
  textPreview: string;
}

async function detectOverflowOffenders(
  page: import('@playwright/test').Page,
): Promise<OverflowOffender[]> {
  return page.evaluate(() => {
    const offenders: {
      tag: string;
      cls: string;
      id: string;
      sw: number;
      cw: number;
      overflow: string;
      position: string;
      textPreview: string;
    }[] = [];
    document.querySelectorAll('*').forEach((el) => {
      const computed = getComputedStyle(el);
      const isOverflowConstrained = computed.overflow !== 'visible' && computed.overflow !== '';
      const isFixedOrAbsolute = computed.position === 'fixed' || computed.position === 'absolute';
      if (!isOverflowConstrained && !isFixedOrAbsolute) return;
      if ((el as HTMLElement).dataset?.allowOverflow === 'true') return;
      // XOL-175 / Path B Safeguard 1: exempt elements with data-overflow-pending-fix
      // (any non-empty value indicates a tracked bug ticket; remove marker on fix)
      if ((el as HTMLElement).dataset?.overflowPendingFix) return;
      if (el.scrollWidth > el.clientWidth + 1) {
        offenders.push({
          tag: el.tagName,
          cls: (el as HTMLElement).className || '',
          id: el.id || '',
          sw: el.scrollWidth,
          cw: el.clientWidth,
          overflow: computed.overflow,
          position: computed.position,
          textPreview: (el.textContent || '').slice(0, 60),
        });
      }
    });
    return offenders;
  });
}

// URLs whose 404/error console messages are expected in non-Vercel environments.
const ABORT_URL_PATTERNS = [
  // Vercel Analytics is only served on Vercel infrastructure; aborts cleanly in local/CI.
  '**/_vercel/insights/**',
];

test('landing page UI sweep', async ({ page }, testInfo) => {
  // Fulfill known third-party requests with empty 200s outside Vercel to prevent spurious console errors.
  for (const pattern of ABORT_URL_PATTERNS) {
    await page.route(pattern, (route) => route.fulfill({ status: 200, body: '' }));
  }

  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() !== 'error') return;
    const text = msg.text();
    if (ALLOWED_CONSOLE_NOISE.some((re) => re.test(text))) return;
    errors.push(text);
  });
  page.on('pageerror', (err) => {
    errors.push(`pageerror: ${err.message}`);
  });

  await page.goto('/', { waitUntil: 'networkidle' });

  const viewport = page.viewportSize()!;
  const dir = `${viewport.width}x${viewport.height}`;
  await page.screenshot({
    path: `__tests__/ui-sweep/${dir}/landing.png`,
    fullPage: true,
  });

  // Class-1: No horizontal overflow (1px tolerance for sub-pixel rounding)
  const overflow = await page.evaluate(() => {
    const html = document.documentElement;
    return { scroll: html.scrollWidth, client: html.clientWidth };
  });
  expect(overflow.scroll, `horizontal overflow at ${dir}`).toBeLessThanOrEqual(overflow.client + 1);

  // Class-5: No constrained-overflow or fixed/absolute-positioned element overflows its parent
  const offenders = await detectOverflowOffenders(page);
  expect(
    offenders,
    `Class-5 overflow at / × ${dir}: ${JSON.stringify(offenders, null, 2)}`,
  ).toEqual([]);

  // No error boundary rendered
  await expect(page.locator('[data-testid="error-boundary"]')).toHaveCount(0);

  // Wedge: hero contains "OLX"
  const bodyText = await page.locator('body').innerText();
  expect(bodyText, `hero/body should mention OLX at ${dir}`).toMatch(/olx/i);

  // Wedge: pricing contains both "€" and "лв."
  expect(bodyText, `pricing should contain € at ${dir}`).toContain('€');
  expect(bodyText, `pricing should contain лв. at ${dir}`).toContain('лв.');

  // No unhandled console errors
  expect(errors, `console errors at ${dir}: ${errors.join('; ')}`).toEqual([]);
});
