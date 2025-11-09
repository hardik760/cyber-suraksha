'use client';

import Sidebar from './Sidebar';
import ModeBanner from './ModeBanner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-60">
        <ModeBanner />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
