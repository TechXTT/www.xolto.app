import type { Metadata } from 'next';
import './globals.css';
import { Outfit, Sora } from 'next/font/google';

export const metadata: Metadata = {
  title: 'xolto — Used electronics copilot',
  description:
    'Buy used electronics without overpaying. xolto scans second-hand electronics listings, estimates fair value, flags risks, and helps you decide which sellers to contact first.',
  openGraph: {
    title: 'xolto — Used electronics copilot',
    description:
      'Mission-based used electronics buying: live matches, fair-value scoring, risk flags, saved comparisons, and seller drafting.',
    type: 'website',
  },
};

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
