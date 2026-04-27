// CANONICAL SOURCE: markt/internal/billing/limits.go::TierDisplayName.
// When tier labels change, update markt + xolto-app + this repo in lockstep.
// The markt JSON snapshot at internal/billing/testdata/tier_display_labels.json
// is authoritative; this test mirrors it.
//
// Runs under Node's built-in test runner (node --test) with native TS
// support — no framework, no transpile step:
//
//   node --test __tests__/tier-labels.test.ts

import test from 'node:test';
import assert from 'node:assert/strict';

import { plans } from '../components/landing/Pricing.tsx';

// Canonical mapping mirrored from
// markt/internal/billing/testdata/tier_display_labels.json. Order matches the
// order tiers appear in Pricing.tsx (free → pro → power, cheapest first).
const CANONICAL_TIER_DISPLAY_LABELS: Record<string, string> = {
  free: 'Free',
  pro: 'Buyer',
  power: 'Pro',
};
const CANONICAL_SLUG_ORDER = ['free', 'pro', 'power'] as const;

test('Pricing.tsx tier slugs match canonical order', () => {
  const slugs = plans.map((plan) => plan.slug);
  assert.deepEqual(
    slugs,
    [...CANONICAL_SLUG_ORDER],
    'plans[].slug must be [free, pro, power] in that order',
  );
});

test('Pricing.tsx display names match canonical mapping for every slug', () => {
  for (const plan of plans) {
    const expected = CANONICAL_TIER_DISPLAY_LABELS[plan.slug];
    assert.equal(
      plan.name,
      expected,
      `Pricing.tsx plan with slug "${plan.slug}" has display name "${plan.name}", canonical is "${expected}".`,
    );
  }
});

test('Pricing.tsx display names are exactly [Free, Buyer, Pro] in that order', () => {
  // This mirrors the order of slugs [free, pro, power] from the markt
  // canonical mapping. If this fails, either Pricing.tsx tier order or
  // tier-name copy has drifted from markt.
  const names = plans.map((plan) => plan.name);
  assert.deepEqual(names, ['Free', 'Buyer', 'Pro']);
});

test('Pricing.tsx CTA hrefs encode the matching internal slug for paid tiers', () => {
  // Defensive: keeps the slug<->ctaHref?plan= consistency that
  // /register reads to remap the post-auth upgrade flow.
  for (const plan of plans) {
    const href = plan.ctaHref('https://app.example');
    if (plan.slug === 'free') {
      assert.equal(
        href,
        'https://app.example/register',
        'Free tier CTA must not carry a ?plan= param',
      );
    } else {
      assert.ok(
        href.includes(`plan=${plan.slug}`),
        `Paid tier "${plan.slug}" CTA href "${href}" must include plan=${plan.slug}`,
      );
    }
  }
});
