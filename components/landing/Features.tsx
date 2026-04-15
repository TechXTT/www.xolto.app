import SectionHeading from './SectionHeading';
import SectionKicker from './SectionKicker';

const featureCards = [
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#17c88e"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M6.3 6.3a8 8 0 0 0 0 11.4" />
        <path d="M17.7 6.3a8 8 0 0 1 0 11.4" />
        <path d="M3.5 3.5a14 14 0 0 0 0 17" />
        <path d="M20.5 3.5a14 14 0 0 1 0 17" />
      </svg>
    ),
    title: 'Live deal radar',
    body: 'Set a mission once. xolto polls every marketplace on your behalf and streams new matches to your dashboard — no refreshing, no missed listings.',
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#17c88e"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    title: 'AI price intelligence',
    body: 'Every listing gets a fair-value score and a suggested offer. Know what to pay and what to skip without hours of cross-referencing sold prices yourself.',
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#17c88e"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 3.5h12a.5.5 0 0 1 .5.5v16L12 17l-6.5 3.5V4a.5.5 0 0 1 .5-.5z" />
      </svg>
    ),
    title: 'Shortlist & brief builder',
    body: 'Save the listings worth another look. The assistant remembers your preferences and refines your buying brief as you narrow in on what you want.',
  },
];

export default function Features() {
  return (
    <section id="features" className="landing-section-padding">
      <div className="landing-section-wrap max-w-[1200px] mx-auto">
        <SectionKicker>What it does</SectionKicker>
        <SectionHeading>
          Your AI buying agent,
          <br />
          working while you sleep.
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {featureCards.map((card, i) => (
            <div
              key={card.title}
              className={`reveal bg-surface border border-brand/15 rounded-[20px] p-7
                          transition-[border-color,box-shadow] duration-200
                          hover:border-brand/28 hover:shadow-[0_16px_40px_rgb(0_0_0/0.3),0_0_0_1px_rgb(15_143_103/0.1)]
                          ${i === 1 ? 'reveal-2' : i === 2 ? 'reveal-3' : ''}`}
            >
              <div className="w-[50px] h-[50px] rounded-[14px] bg-brand/14 flex items-center justify-center mb-5">
                {card.icon}
              </div>
              <h3 className="font-bold text-[1.1rem] text-ink mb-2.5 leading-snug">{card.title}</h3>
              <p className="text-ink/60 text-[0.9375rem] leading-[1.65]">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
