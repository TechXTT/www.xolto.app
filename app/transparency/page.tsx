import type { Metadata } from 'next';
import Footer from '../../components/landing/Footer';
import Nav from '../../components/landing/Nav';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// Founder updates this on publish. While the page is BLOCKED-ON F2 lawyer review
// the value stays "Pending publish" so it cannot accidentally ship with a stale date.
const lastUpdated = 'Pending publish';

export const metadata: Metadata = {
  title: 'How xolto handles OLX.bg — xolto',
  description:
    "xolto's stance on OLX.bg listing data, partner-program engagement, and what we will and won't do on your behalf.",
  alternates: {
    canonical: '/transparency',
  },
  robots: {
    index: false,
    follow: false,
  },
};

type Bullet = {
  title: string;
  body: string;
};

const bullets: Bullet[] = [
  {
    title: 'Read public listings only.',
    body: "xolto reads OLX.bg public listing data to advise you about fair value and decisional clarity on listings you choose to evaluate. We don't republish, we don't aggregate seller-side data, we don't scrape personal information.",
  },
  {
    title: "Registered with OLX's developer partner program.",
    body: "xolto applied to and was approved by the OLX BG Developer Portal partner program. The documented partner API supports own-listing management — it doesn't cover the buyer-aggregator use case xolto serves. We registered through the official channel because being on-record matters.",
  },
  {
    title: 'Pursuing entity-level partnership.',
    body: 'Separate from the developer portal, xolto is in active conversation with Naspers Classifieds Bulgaria (operator of OLX BG) about a permitted access pathway for the buyer-aggregator use case. An inquiry of record exists; a substantive response is pending.',
  },
  {
    title: 'Deep-link-only by design.',
    body: 'xolto never sends messages on your behalf. We compose the draft in your voice, you press send on OLX.bg. That keeps you in control and means you always know exactly what was said, when, and to whom. That is the principle, full stop.',
  },
  {
    title: 'No PII, no republish, no on-behalf-anything.',
    body: "We honor these whether or not the access-channel conversation resolves. They aren't conditional on partnership outcomes.",
  },
  {
    title: 'Honest about interim.',
    body: "While the entity-level partnership conversation continues, our reads are a documented best-effort workaround for a use case the official partner program doesn't currently serve. We continue pursuing a permitted access pattern. We will update this page when the access conversation settles.",
  },
];

export default function TransparencyPage() {
  return (
    <div id="top" className="bg-canvas text-ink font-sans antialiased">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Nav appURL={APP_URL} />
      <main id="main-content">
        <section className="max-w-[720px] mx-auto px-5 sm:px-6 py-16 sm:py-24">
          <header className="mb-10">
            <p className="text-[0.875rem] uppercase tracking-[0.12em] text-ink/50 mb-3">
              Stance, not policy
            </p>
            <h1 className="landing-section-title landing-section-heading text-ink mb-4">
              How xolto handles OLX.bg
            </h1>
            <p className="text-[1rem] text-ink/70 leading-[1.6] max-w-[60ch]">
              Six points on what we read, what we don&apos;t, and how we&apos;re engaging with OLX
              about a permitted partnership pathway.
            </p>
          </header>

          <ol className="space-y-7">
            {bullets.map((bullet, index) => (
              <li key={bullet.title} className="flex gap-4 sm:gap-5">
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 w-7 h-7 rounded-full bg-brand/10 text-brand font-semibold text-[0.875rem] flex items-center justify-center"
                >
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <h2 className="text-[1.05rem] sm:text-[1.125rem] font-semibold text-ink mb-1.5 leading-snug">
                    {bullet.title}
                  </h2>
                  <p className="text-[0.95rem] text-ink/70 leading-[1.65]">{bullet.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <footer className="mt-14 pt-6 border-t border-brand/15 text-[0.8125rem] text-ink/50 leading-[1.6]">
            <p>
              Last updated: {lastUpdated}. Questions:{' '}
              <a href="mailto:hello@xolto.app" className="text-ink/70 hover:text-ink underline">
                hello@xolto.app
              </a>
              .
            </p>
          </footer>
        </section>
      </main>
      <Footer appURL={APP_URL} />
    </div>
  );
}
