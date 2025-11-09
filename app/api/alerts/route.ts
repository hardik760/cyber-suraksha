import { NextResponse } from 'next/server';
import { getMode } from '@/lib/keyManager';
import { getDemoData } from '@/lib/demoData';

export async function GET() {
  const mode = getMode();

  if (mode === 'demo') {
    const demoData = getDemoData();
    return NextResponse.json({
      alerts: demoData.alerts,
      total_count: demoData.alerts.length,
      unread_count: 2,
      critical_count: 1,
    });
  }

  // Production mode would query Supabase here
  const demoData = getDemoData();
  return NextResponse.json({
    alerts: demoData.alerts,
    total_count: demoData.alerts.length,
    unread_count: 2,
    critical_count: 1,
  });
}
