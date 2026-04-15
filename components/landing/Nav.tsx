import LogoMark from './LogoMark';

type NavProps = {
  appURL: string;
};

export default function Nav({ appURL }: NavProps) {
  return (
    <nav className="landing-nav fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-4 h-[68px] border-b border-brand/10">
      <a
        href="/"
        aria-current="page"
        className="flex items-center gap-2.5 font-bold text-[1.05rem] tracking-[-0.02em]"
      >
        <LogoMark />
      </a>
      <div className="hidden md:flex items-center gap-6 text-sm text-ink/60">
        <a href="#features" className="hover:text-ink transition-colors" aria-current="page">
          Home
        </a>
        <a href="#how-it-works" className="hover:text-ink transition-colors">
          How it works
        </a>
        <a href="#pricing" className="hover:text-ink transition-colors">
          Pricing
        </a>
      </div>
      <div className="flex items-center gap-2.5">
        <a href={`${appURL}/login`} className="btn btn-ghost btn-sm">
          Log in
        </a>
        <a href={`${appURL}/register`} className="btn btn-primary btn-sm">
          Get started free
        </a>
      </div>
    </nav>
  );
}
