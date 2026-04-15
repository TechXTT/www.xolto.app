import type { Metadata } from 'next';
import './globals.css';
import { Outfit, Sora } from 'next/font/google';
import { dashboardURL, siteURL } from './site';

export const metadata: Metadata = {
  title: 'xolto — Used electronics copilot',
  description:
    'Buy used electronics without overpaying. xolto scans second-hand electronics listings, estimates fair value, flags risks, and helps you decide which sellers to contact first.',
  metadataBase: new URL(siteURL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'xolto — Used electronics copilot',
    description:
      'Mission-based used electronics buying: live matches, fair-value scoring, risk flags, saved comparisons, and seller drafting.',
    type: 'website',
    url: siteURL,
    siteName: 'xolto',
    images: [
      {
        url: `${siteURL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: 'xolto — Buy used electronics without overpaying',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'xolto — Used electronics copilot',
    description:
      'AI-powered marketplace intelligence for buying used electronics without overpaying.',
    images: [`${siteURL}/opengraph-image.png`],
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
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

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'xolto',
  url: siteURL,
  logo: `${siteURL}/icon.svg`,
  sameAs: [dashboardURL],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${outfit.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
