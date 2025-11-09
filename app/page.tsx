'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect to dashboard
    router.push('/dashboard');
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary">Cyber-Suraksha OPS</h1>
        <p className="mt-4 text-textSecondary">Redirecting to dashboard...</p>
      </div>
    </main>
  );
}
