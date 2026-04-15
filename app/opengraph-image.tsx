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
      <div style={{ display: 'flex', alignItems: 'center', fontSize: 44, fontWeight: 800 }}>
        xolto
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
