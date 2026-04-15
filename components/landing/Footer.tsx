import LogoMark from './LogoMark';

type FooterProps = {
  appURL: string;
};

const footerLinks: Array<{ label: string; href: string }> = [
  { label: 'Missions', href: '/missions' },
  { label: 'Matches', href: '/matches' },
  { label: 'Saved', href: '/saved' },
  { label: 'Settings', href: '/settings' },
  { label: 'Pricing', href: '#pricing' },
];

export default function Footer({ appURL }: FooterProps) {
  return (
    <div className="border-t border-brand/15 bg-canvas/70">
      <footer className="landing-footer-grid grid grid-cols-1 lg:grid-cols-3 gap-10 items-center max-w-[1200px] mx-auto">
        <div>
          <a
            href="/"
            aria-current="page"
            className="flex items-center gap-2.5 font-bold text-[1.05rem] tracking-[-0.02em]"
          >
            <LogoMark />
          </a>
          <p className="text-[0.875rem] text-ink/38 mt-2 max-w-[32ch] leading-[1.55]">
            AI-powered deal intelligence for serious marketplace buyers.
          </p>
        </div>

        <nav className="flex flex-wrap justify-start lg:justify-center gap-7">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href.startsWith('#') ? link.href : `${appURL}${link.href}`}
              className="text-[0.875rem] text-ink/38 hover:text-ink transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col items-start lg:items-end gap-3">
          <p className="text-[0.875rem] text-ink/60">Ready to find better deals?</p>
          <a href={`${appURL}/register`} className="btn btn-primary btn-sm">
            Create free account
          </a>
        </div>
      </footer>

      <div className="landing-footer-bottom text-center text-[0.8rem] text-ink/38 max-w-[1200px] mx-auto py-5">
        © 2026 xolto &nbsp;·&nbsp; Built for serious electronics buyers
      </div>
    </div>
  );
}
