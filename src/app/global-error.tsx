"use client";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html>
      <head>
        <title>Something went wrong!</title>
      </head>
      <body>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '2rem',
          background: 'rgb(10 10 10)',
          color: 'rgb(229 229 229)',
          fontFamily: 'system-ui, sans-serif',
        }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong!</h2>
          <p style={{ marginBottom: '1.5rem', color: 'rgb(161 161 170)' }}>
            We encountered an unexpected error. Please try again.
          </p>
          <button
            onClick={unstable_retry}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'rgb(34 197 94)',
              color: 'rgb(10 10 10)',
              border: 'none',
              borderRadius: '0.5rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}