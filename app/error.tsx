'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

type ErrorFallbackProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorFallbackProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <main className="landing-shell" style={{ minHeight: '100vh', placeItems: 'center' }}>
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
        <h2>Something went wrong.</h2>
        <p style={{ color: 'rgba(220, 236, 230, 0.86)' }}>
          We logged this incident to monitoring. Try again or refresh the page.
        </p>
        <button type="button" className="btn-primary" onClick={() => reset()}>
          Try again
        </button>
      </section>
    </main>
  );
}
