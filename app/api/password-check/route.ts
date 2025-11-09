import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: 'Password required' },
        { status: 400 }
      );
    }

    // Calculate password entropy: H = L × log₂(N)
    const length = password.length;
    let characterSetSize = 0;

    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigits = /[0-9]/.test(password);
    const hasSpecial = /[^a-zA-Z0-9]/.test(password);

    if (hasLowercase) characterSetSize += 26;
    if (hasUppercase) characterSetSize += 26;
    if (hasDigits) characterSetSize += 10;
    if (hasSpecial) characterSetSize += 32;

    const entropy = length * Math.log2(characterSetSize || 1);

    let strength = 'very_weak';
    if (entropy >= 80) strength = 'very_strong';
    else if (entropy >= 60) strength = 'strong';
    else if (entropy >= 40) strength = 'moderate';
    else if (entropy >= 25) strength = 'weak';

    const issues: string[] = [];
    if (length < 12) issues.push('Password too short (minimum 12 characters recommended)');
    if (!hasUppercase) issues.push('Missing uppercase letters');
    if (!hasDigits) issues.push('Missing numbers');
    if (!hasSpecial) issues.push('Missing special characters');
    if (/password|123456|qwerty/i.test(password)) issues.push('Contains common password pattern');

    return NextResponse.json({
      password_masked: password.substring(0, 3) + '*'.repeat(Math.max(0, length - 5)) + password.substring(length - 2),
      entropy_bits: Math.round(entropy * 10) / 10,
      strength,
      character_sets_used: {
        lowercase: hasLowercase,
        uppercase: hasUppercase,
        digits: hasDigits,
        special: hasSpecial,
      },
      length,
      issues,
      suggestions: [
        'Increase length to 16+ characters',
        'Use a mix of character types',
        'Avoid common words and patterns',
        'Consider using a passphrase',
      ],
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
