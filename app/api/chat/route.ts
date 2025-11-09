import { NextRequest, NextResponse } from 'next/server';
import { getMode, getOpenAIKey } from '@/lib/keyManager';
import { getDemoData } from '@/lib/demoData';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, context } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Missing message' },
        { status: 400 }
      );
    }

    const mode = getMode();

    if (mode === 'prod') {
      return await chatProd(message, context);
    } else {
      return chatDemo(message);
    }
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function chatProd(message: string, context: any) {
  const openaiKey = getOpenAIKey();

  if (!openaiKey) {
    return NextResponse.json(
      { error: 'OpenAI API key not configured' },
      { status: 500 }
    );
  }

  try {
    const openai = new OpenAI({ apiKey: openaiKey });

    const systemPrompt = `You are a cybersecurity advisor for small and medium businesses.
You help users understand cyber threats, guide them through security simulations,
and provide actionable recommendations. Be concise, helpful, and security-focused.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0].message.content || 'I apologize, I could not process that request.';

    return NextResponse.json({
      message_id: `msg_${Date.now()}`,
      response,
      follow_up_suggestions: [
        'Tell me more about phishing',
        'How do I enable 2FA?',
        'What is ransomware?',
      ],
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return NextResponse.json(
      { error: 'OpenAI API failure' },
      { status: 500 }
    );
  }
}

function chatDemo(message: string) {
  const demoData = getDemoData();
  const responses = demoData.chat_responses;

  const lowerMessage = message.toLowerCase();

  // Simple keyword matching
  if (lowerMessage.includes('phishing') || lowerMessage.includes('phish')) {
    return NextResponse.json({
      message_id: `msg_${Date.now()}`,
      response: responses.phishing,
      follow_up_suggestions: [
        'How do I spot phishing emails?',
        'What should I do if I click a phishing link?',
      ],
      timestamp: new Date().toISOString(),
    });
  }

  if (lowerMessage.includes('ransomware')) {
    return NextResponse.json({
      message_id: `msg_${Date.now()}`,
      response: responses.ransomware,
      follow_up_suggestions: [
        'How do I protect against ransomware?',
        'What if I\'m infected with ransomware?',
      ],
      timestamp: new Date().toISOString(),
    });
  }

  if (lowerMessage.includes('vendor') || lowerMessage.includes('breach')) {
    return NextResponse.json({
      message_id: `msg_${Date.now()}`,
      response: responses.vendor,
      follow_up_suggestions: [
        'Show me vendor breach remediation steps',
        'How do I assess vendor risk?',
      ],
      timestamp: new Date().toISOString(),
    });
  }

  if (lowerMessage.includes('password') || lowerMessage.includes('weak')) {
    return NextResponse.json({
      message_id: `msg_${Date.now()}`,
      response: responses.weak_password,
      follow_up_suggestions: [
        'Generate a strong password for me',
        'How do I use a password manager?',
      ],
      timestamp: new Date().toISOString(),
    });
  }

  if (lowerMessage.includes('2fa') || lowerMessage.includes('two-factor')) {
    return NextResponse.json({
      message_id: `msg_${Date.now()}`,
      response: responses['2fa'],
      follow_up_suggestions: [
        'How do I set up 2FA?',
        'What is the most secure 2FA method?',
      ],
      timestamp: new Date().toISOString(),
    });
  }

  // Default response
  return NextResponse.json({
    message_id: `msg_${Date.now()}`,
    response: responses.default,
    follow_up_suggestions: [
      'Tell me about phishing',
      'What is ransomware?',
      'How do I improve my security score?',
    ],
    timestamp: new Date().toISOString(),
  });
}
