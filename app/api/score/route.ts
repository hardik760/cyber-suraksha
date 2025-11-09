import { NextResponse } from 'next/server';
import { getMode } from '@/lib/keyManager';
import { getDemoData } from '@/lib/demoData';

export async function GET() {
  const mode = getMode();

  if (mode === 'demo') {
    const demoData = getDemoData();
    return NextResponse.json(demoData.cyber_health_score);
  }

  // Production mode would query Supabase here
  return NextResponse.json(getDemoData().cyber_health_score);
}
