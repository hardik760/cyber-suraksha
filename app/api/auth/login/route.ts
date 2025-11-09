import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Auto-login for demo - accept any email
    return NextResponse.json({
      success: true,
      user: {
        id: 'user_demo',
        email: email || 'demo@cyber-suraksha.test',
        name: 'Demo User',
        role: 'admin',
      },
      token: 'demo_token_' + Date.now(),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 400 }
    );
  }
}
