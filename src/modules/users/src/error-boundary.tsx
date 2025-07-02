import React from 'react';
import * as Sentry from '@sentry/react';
import { useRouteError } from 'react-router';

export default function ErrorBoundaryComponent() {
  const error = useRouteError() as Error;

  React.useEffect(() => {
    console.log(error, 'error');
    Sentry.captureException(error);
  }, [error]);

  console.log(error, 'outside of useEffect');

  return (
    <div style={{ padding: '20px', border: '1px solid red', margin: '10px' }}>
      <h3>Something went wrong in @ssr/users</h3>
      <details>
        <summary>Error details</summary>
        <pre>{error?.stack}</pre>
      </details>
    </div>
  );
}
