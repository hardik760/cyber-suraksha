import { NextRequest, NextResponse } from 'next/server';
import { getMode } from '@/lib/keyManager';
import { getDemoData } from '@/lib/demoData';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { scenario, params } = body;

    if (!scenario) {
      return NextResponse.json(
        { error: 'Scenario required' },
        { status: 400 }
      );
    }

    const mode = getMode();
    const demoData = getDemoData();
    const simResults = demoData.simulation_results;

    // Map scenario to simulation result
    const scenarioMap: Record<string, string> = {
      phishing_attack: 'phishing_attack',
      weak_password: 'weak_password_attack',
      ransomware_attack: 'ransomware_attack',
      vendor_breach: 'vendor_breach',
    };

    const resultKey = scenarioMap[scenario] || 'phishing_attack';
    const result = simResults[resultKey];

    // Add remediation suggestions
    return NextResponse.json({
      ...result,
      final_state: {
        infected_nodes: result.infected_nodes,
        time_to_complete: result.time_to_spread * 1000,
        score_impact: result.score_impact,
        bpi_change: result.bpi_change,
        data_compromised: 'Customer database (2500 records)',
      },
      remediation_suggestions: [
        'Enable 2FA on all accounts',
        'Apply security patches immediately',
        'Implement email filtering rules',
        'Conduct security awareness training',
      ],
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
