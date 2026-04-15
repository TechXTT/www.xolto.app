import { ImageResponse } from 'next/og';
import { siteURL } from './site';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '56px 64px',
        backgroundColor: '#080f0c',
        backgroundImage:
          'radial-gradient(ellipse 70% 55% at 65% -5%, rgba(15, 143, 103, 0.3), rgba(8, 15, 12, 0) 70%)',
        color: '#f0faf6',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <svg width="72" height="72" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="og-front" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0f8f67" />
              <stop offset="100%" stopColor="#52d4a5" />
            </linearGradient>
            <linearGradient id="og-back" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f8f67" />
              <stop offset="100%" stopColor="#0a6f4f" />
            </linearGradient>
          </defs>
          <path d="M 10 10 L 40 10 L 90 60 L 90 90 L 60 90 L 10 40 Z" fill="url(#og-back)" />
          <path d="M 10 90 L 40 90 L 90 40 L 90 10 L 60 10 L 10 60 Z" fill="url(#og-front)" />
        </svg>
        <span style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-0.03em' }}>xolto</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 84,
            lineHeight: 0.92,
            fontWeight: 700,
            letterSpacing: '-0.06em',
          }}
        >
          <span>Buy used electronics</span>
          <span>without overpaying.</span>
        </div>
        <div style={{ display: 'flex', fontSize: 32, color: '#9bc6b4' }}>
          AI-powered marketplace intelligence
        </div>
      </div>
      <div style={{ display: 'flex', fontSize: 24, color: '#7ca797' }}>{siteURL}</div>
    </div>,
    {
      ...size,
    },
  );
}
