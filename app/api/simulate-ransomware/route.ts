import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { confirm_admin, scope } = body;

    if (!confirm_admin) {
      return NextResponse.json(
        { error: 'Admin confirmation required' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      simulation_id: `ransomware_${Date.now()}`,
      timeline: [
        {
          time: 0,
          phase: 'infection',
          description: 'Ransomware payload executed via phishing attachment',
          affected_nodes: ['employee_1'],
        },
        {
          time: 5000,
          phase: 'encryption',
          description: 'Files being encrypted: Documents, spreadsheets, databases',
          files_encrypted: 1247,
        },
        {
          time: 10000,
          phase: 'detection',
          description: 'Unusual file activity detected by monitoring system',
          alert_triggered: true,
        },
        {
          time: 12000,
          phase: 'containment',
          description: 'Workstation isolated from network automatically',
          network_isolated: true,
        },
        {
          time: 15000,
          phase: 'recovery',
          description: 'Restoring from last clean backup (24 hours old)',
          files_restored: 1247,
        },
      ],
      impact: {
        files_affected: 1247,
        downtime_minutes: 45,
        data_loss: '24 hours of work',
        ransom_demanded: '$50,000',
        recovery_cost: '$8,000',
      },
      lessons: [
        'Regular backups prevented data loss',
        'Isolation contained the spread',
        '24-hour backup interval caused work loss',
        'Detection system worked effectively',
      ],
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
