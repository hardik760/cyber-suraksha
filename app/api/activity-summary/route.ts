import { NextResponse } from 'next/server';
import { getMode } from '@/lib/keyManager';
import { getDemoData } from '@/lib/demoData';

export async function GET() {
  const mode = getMode();

  if (mode === 'demo') {
    const demoData = getDemoData();
    return NextResponse.json(demoData.activity_summary);
  }

  // Production mode would aggregate from Supabase here
  return NextResponse.json(getDemoData().activity_summary);
}
