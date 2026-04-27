import Features from '../components/landing/Features';
import Footer from '../components/landing/Footer';
import Hero from '../components/landing/Hero';
import HowItWorks from '../components/landing/HowItWorks';
import Nav from '../components/landing/Nav';
import Pricing from '../components/landing/Pricing';
import TryVerdict from '../components/landing/TryVerdict';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export default function LandingPage() {
  return (
    <div id="top" className="bg-canvas text-ink font-sans antialiased">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Nav appURL={APP_URL} />
      <main id="main-content">
        <Hero appURL={APP_URL} />
        <TryVerdict />
        <Features />
        <HowItWorks />
        <Pricing appURL={APP_URL} />
      </main>
      <Footer appURL={APP_URL} />
    </div>
  );
}
