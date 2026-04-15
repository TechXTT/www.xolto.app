import type { ReactNode } from 'react';

type SectionHeadingProps = {
  children: ReactNode;
  className?: string;
};

export default function SectionHeading({ children, className = '' }: SectionHeadingProps) {
  return (
    <h2
      className={`landing-section-title text-ink mb-4 landing-section-heading ${className}`.trim()}
    >
      {children}
    </h2>
  );
}
