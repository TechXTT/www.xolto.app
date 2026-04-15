import SectionHeading from './SectionHeading';
import SectionKicker from './SectionKicker';

type PricingProps = {
  appURL: string;
};

const plans = [
  {
    name: 'Free',
    price: '€0',
    featured: false,
    features: ['3 active searches', '30 minute polling'],
    missing: ['AI search generation', 'Full assistant access', 'Auto-messaging'],
    cta: 'Get started free',
  },
  {
    name: 'Pro',
    price: '€9',
    featured: true,
    features: [
      '10 active searches',
      '5 minute polling',
      'AI search generation',
      'Full assistant access',
    ],
    missing: ['Auto-messaging'],
    cta: 'Upgrade to Pro',
  },
  {
    name: 'Power',
    price: '€29',
    featured: false,
    features: [
      'Unlimited missions',
      '50 active searches',
      '1 minute polling',
      'AI search generation',
      'Full assistant access',
      'Auto-messaging',
    ],
    missing: [],
    cta: 'Get Power',
  },
];

export default function Pricing({ appURL }: PricingProps) {
  return (
    <section id="pricing" className="landing-section-padding">
      <div className="landing-section-wrap max-w-[1200px] mx-auto">
        <SectionKicker>Pricing</SectionKicker>
        <SectionHeading>
          Pick a plan.
          <br />
          Cancel any time.
        </SectionHeading>
        <p className="text-ink/60 text-[1.05rem] leading-[1.7] max-w-[56ch]">
          Start free and upgrade as your hunt gets more serious.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-14 items-start">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`reveal relative bg-surface rounded-[20px] p-7 flex flex-col gap-5
                          ${i === 1 ? 'reveal-2' : i === 2 ? 'reveal-3' : ''}
                          ${
                            plan.featured
                              ? 'border-[1.5px] border-brand landing-plan-featured'
                              : 'border border-brand/15'
                          }`}
            >
              {plan.featured && (
                <span className="absolute -top-[13px] left-1/2 -translate-x-1/2 text-white text-[0.75rem] font-bold px-3.5 py-1 rounded-full tracking-[0.06em] whitespace-nowrap landing-popular-pill">
                  Most popular
                </span>
              )}

              <div>
                <div className="text-[0.8125rem] font-bold tracking-[0.1em] uppercase text-ink/38 mb-2">
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-1">
                  <strong className="landing-plan-price text-ink">{plan.price}</strong>
                  <span className="text-[0.875rem] text-ink/38">/month</span>
                </div>
              </div>

              <ul className="flex flex-col gap-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-[0.9rem] text-ink/60">
                    <span className="w-4 h-4 shrink-0 rounded-full bg-brand/18 flex items-center justify-center">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M2 5l1.8 1.8L8 3"
                          stroke="#17c88e"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
                {plan.missing.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-[0.9rem] text-ink/25">
                    <span className="w-4 h-4 shrink-0 rounded-full bg-white/4 flex items-center justify-center">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 5h4"
                          stroke="rgb(240 250 246 / 0.2)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={`${appURL}/register`}
                className={`btn btn-full ${plan.featured ? 'btn-primary' : 'btn-ghost'}`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
