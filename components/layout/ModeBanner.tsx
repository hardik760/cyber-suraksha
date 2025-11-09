'use client';

import { useEffect, useState } from 'react';

export default function ModeBanner() {
  const [mode, setMode] = useState<'prod' | 'demo' | null>(null);

  useEffect(() => {
    // Check mode from API
    fetch('/api/score')
      .then(() => setMode('demo')) // For now, always demo
      .catch(() => setMode('demo'));
  }, []);

  if (!mode) return null;

  return (
    <div className={`py-2 px-4 text-center text-sm ${
      mode === 'prod'
        ? 'bg-green-50 text-green-800'
        : 'bg-blue-50 text-blue-800'
    }`}>
      {mode === 'prod' ? (
        <>🛡️ Live Protected Mode (Secure Connection Active)</>
      ) : (
        <>🛡️ Secure Live Demo Mode (API Keys Managed Server-Side)</>
      )}
    </div>
  );
}
