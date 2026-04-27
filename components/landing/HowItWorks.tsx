import SectionHeading from './SectionHeading';
import SectionKicker from './SectionKicker';

const steps = [
  {
    num: '01',
    title: 'Brief the AI',
    body: 'Chat with the assistant to describe the item, budget, and condition you want. It extracts your intent and generates a precise set of market hunts — ready to activate.',
  },
  {
    num: '02',
    title: 'Let it hunt',
    body: 'Active hunts run on a schedule you set — from every 30 minutes down to every minute. We check OLX.bg listings continuously and surface only the ones worth your time.',
  },
  {
    num: '03',
    title: 'Act on what surfaces',
    body: 'Every incoming listing is AI-scored against fair market value. Review the shortlist, see the suggested offer, and message the seller with confidence.',
  },
];

export default function HowItWorks() {
  return (
    <div id="how-it-works" className="landing-how-wrap border-y border-brand/15">
      <section className="landing-section-padding">
        <div className="landing-section-wrap max-w-[1200px] mx-auto">
          <SectionKicker>How it works</SectionKicker>
          <SectionHeading>
            From setup to deal alert
            <br />
            in three steps.
          </SectionHeading>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 mt-14 relative">
            <div className="landing-step-connector absolute top-12 hidden lg:block border-t border-dashed border-brand/30" />
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`reveal border-l-2 border-brand/20 pl-6 lg:border-l-0 lg:pl-0
                            ${i === 1 ? 'reveal-2 lg:px-7' : i === 2 ? 'reveal-3 lg:pl-7' : 'lg:pr-7'}`}
              >
                <div className="landing-step-number mb-4">{step.num}</div>
                <h4 className="font-bold text-[1.05rem] text-ink mb-2.5">{step.title}</h4>
                <p className="text-ink/60 text-[0.9375rem] leading-[1.65]">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
