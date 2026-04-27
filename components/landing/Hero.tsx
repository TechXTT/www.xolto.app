type HeroProps = {
  appURL: string;
};

const heroRows = [
  {
    dot: 'bg-[#d97706]',
    name: 'Sony α6000 + 16-50mm kit',
    meta: 'Good · OLX.bg · 4 min ago',
    price: '€380 (743.20 лв.)',
  },
  {
    dot: 'bg-bright',
    name: 'Sony α6400 body',
    meta: 'Like new · OLX.bg · 11 min ago',
    price: '€520 (1016.99 лв.)',
  },
  {
    dot: 'bg-white/20',
    name: 'Canon EOS M50 — kit lens',
    meta: 'Fair · OLX.bg · 22 min ago',
    price: '€240 (469.40 лв.)',
  },
];

export default function Hero({ appURL }: HeroProps) {
  return (
    <section className="landing-hero-backdrop min-h-screen flex items-center pt-14 md:pt-[68px]">
      <div className="landing-shell-grid grid gap-6 lg:gap-[60px] items-center w-full max-w-[1200px] mx-auto grid-cols-1 lg:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand/28 bg-brand/10 text-[0.8125rem] font-semibold text-bright mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-bright animate-glow" />
            Your OLX.bg buying copilot
          </div>

          <h1 className="landing-hero-title text-ink">
            <span className="landing-hero-title-line">Buy used cameras</span>
            <span className="landing-hero-title-line">on OLX.bg</span>
            <span className="landing-hero-title-accent">without</span>
            <span className="landing-hero-title-line">overpaying.</span>
          </h1>

          <p className="text-ink/58 text-[1.03rem] leading-[1.75] max-w-[38ch] mb-9 font-medium">
            Get a Buy / Negotiate / Ask seller / Skip recommendation on every listing, with the
            comparables to back it up.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            <a href={`${appURL}/register`} className="btn btn-primary">
              Start a buy mission
            </a>
            <a href={`${appURL}/login`} className="btn btn-ghost">
              Sign in
            </a>
          </div>

          <div className="flex items-center gap-2.5 text-[0.8125rem] text-ink/38">
            <span>Cameras</span>
          </div>
        </div>

        <div className="landing-deal-card bg-surface rounded-[24px] p-5 sm:p-6 border border-brand/28">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2 text-[0.8125rem] font-semibold text-ink/60">
              <span className="w-2 h-2 rounded-full bg-bright animate-glow" />
              Live feed · 3 new matches
            </div>
            <span className="text-[0.75rem] font-bold px-2.5 py-1 rounded-full bg-brand/18 text-bright">
              Sony A6700
            </span>
          </div>

          <div className="bg-surface2 border border-brand/15 rounded-2xl p-[18px] mb-3.5">
            <div className="flex items-start justify-between gap-2.5 mb-3.5">
              <div>
                <div className="font-bold text-[0.9375rem] text-ink leading-snug">
                  Sony A6700 Body Only
                </div>
                <div className="text-[0.75rem] text-ink/38 mt-1">Like new · OLX.bg</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-[1.25rem] font-extrabold text-ink">€840 (1642.87 лв.)</div>
                <div className="text-[0.75rem] font-bold text-bright bg-bright/12 px-2.5 py-0.5 rounded-full mt-1 inline-block">
                  Offer €756 (1478.58 лв.)
                </div>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-white/8 overflow-hidden mb-2">
              <div className="h-full rounded-full animate-score-fill landing-score-bar" />
            </div>
            <div className="flex justify-between text-[0.75rem]">
              <span className="text-ink/38">AI deal score</span>
              <span className="text-bright font-bold">8.7 · Strong buy</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {heroRows.map((row) => (
              <div
                key={row.name}
                className="flex items-center gap-3 px-3.5 py-3 bg-surface2 border border-brand/15 rounded-xl"
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${row.dot}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-[0.8125rem] font-semibold text-ink truncate">{row.name}</div>
                  <div className="text-[0.6875rem] text-ink/38">{row.meta}</div>
                </div>
                <div className="text-[0.875rem] font-bold text-ink shrink-0">{row.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
