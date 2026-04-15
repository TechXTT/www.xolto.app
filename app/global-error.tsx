'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

type GlobalErrorFallbackProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorFallbackProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="landing-shell" style={{ minHeight: '100vh', placeItems: 'center' }}>
        <section
          style={{
            background: 'rgba(4, 16, 14, 0.9)',
            border: '1px solid rgba(37, 211, 143, 0.25)',
            borderRadius: 24,
            maxWidth: 560,
            margin: '0 auto',
            textAlign: 'center',
            display: 'grid',
            gap: 14,
            padding: 28,
          }}
        >
          <h2>A critical error occurred.</h2>
          <p style={{ color: 'rgba(220, 236, 230, 0.86)' }}>
            We logged this issue to monitoring. Try recovering the page.
          </p>
          <button type="button" className="btn-primary" onClick={() => reset()}>
            Try again
          </button>
        </section>
      </body>
    </html>
  );
}
