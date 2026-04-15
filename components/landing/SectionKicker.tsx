import type { ReactNode } from 'react';

type SectionKickerProps = {
  children: ReactNode;
};

export default function SectionKicker({ children }: SectionKickerProps) {
  return (
    <div className="inline-flex items-center gap-2 mb-5 text-bright text-xs font-bold tracking-[0.13em] uppercase">
      <span className="w-2 h-2 rounded-full bg-bright landing-dot-glow" />
      {children}
    </div>
  );
}
