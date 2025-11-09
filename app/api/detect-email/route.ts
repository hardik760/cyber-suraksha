import { NextRequest, NextResponse } from 'next/server';
import { getMode, getOpenAIKey } from '@/lib/keyManager';
import { getDemoData } from '@/lib/demoData';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subject, from, body: emailBody, user_id } = body;

    if (!subject || !from || !emailBody) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const mode = getMode();

    if (mode === 'prod') {
      return await detectEmailProd(subject, from, emailBody);
    } else {
      return detectEmailDemo(subject, from, emailBody);
    }
  } catch (error) {
    console.error('Error in detect-email API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function detectEmailProd(subject: string, from: string, emailBody: string) {
  const openaiKey = getOpenAIKey();

  if (!openaiKey) {
    return NextResponse.json(
      { error: 'OpenAI API key not configured' },
      { status: 500 }
    );
  }

  try {
    const openai = new OpenAI({ apiKey: openaiKey });

    const prompt = `Analyze this email for phishing indicators:

Subject: ${subject}
From: ${from}
Body: ${emailBody}

Provide a JSON response with:
- is_phishing (boolean)
- confidence (0-1)
- indicators (array of strings: urgency_language, domain_typosquatting, suspicious_links, external_sender, authority_impersonation, unusual_request, generic_greeting, poor_grammar)
- explanation (string, 2-3 sentences)
- recommended_action (string)

Be thorough and security-focused.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a cybersecurity expert specializing in phishing detection. Analyze emails and provide structured JSON responses.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return NextResponse.json(
      { error: 'OpenAI API failure' },
      { status: 500 }
    );
  }
}

function detectEmailDemo(subject: string, from: string, emailBody: string) {
  const demoData = getDemoData();
  const emailAnalysis = demoData.email_analysis;

  // Simple keyword matching for demo mode
  const lowerSubject = subject.toLowerCase();
  const lowerFrom = from.toLowerCase();
  const lowerBody = emailBody.toLowerCase();

  // Check for CEO fraud
  if (
    (lowerSubject.includes('urgent') || lowerSubject.includes('immediate')) &&
    (lowerBody.includes('transfer') || lowerBody.includes('payment') || lowerBody.includes('wire'))
  ) {
    return NextResponse.json(emailAnalysis.urgent_ceo_request);
  }

  // Check for password reset phishing
  if (
    lowerSubject.includes('password') ||
    lowerSubject.includes('reset') ||
    lowerSubject.includes('verify')
  ) {
    return NextResponse.json(emailAnalysis.password_reset);
  }

  // Check for invoice scam
  if (
    lowerSubject.includes('invoice') ||
    lowerSubject.includes('payment due') ||
    lowerBody.includes('attached invoice')
  ) {
    return NextResponse.json(emailAnalysis.invoice_attachment);
  }

  // Default: legitimate email
  return NextResponse.json(emailAnalysis.legitimate_newsletter);
}
