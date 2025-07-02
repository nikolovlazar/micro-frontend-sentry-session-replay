import { useState } from 'react';

export default function ErrorComponent() {
  const [hasError, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  if (hasError) {
    throw new Error('ErrorComponent error');
  }

  return (
    <button type='button' onClick={handleError}>
      Throw Error Component Error
    </button>
  );
}
