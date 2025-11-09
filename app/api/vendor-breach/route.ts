import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { vendor_id, breach_type } = body;

    if (!vendor_id || !breach_type) {
      return NextResponse.json(
        { error: 'vendor_id and breach_type required' },
        { status: 400 }
      );
    }

    const vendorNames: Record<string, string> = {
      vendor_aws_hosting: 'AWS Hosting Provider',
      vendor_email_service: 'Email Service Provider',
      vendor_payment_gateway: 'Payment Gateway',
    };

    return NextResponse.json({
      breach_id: `breach_${Date.now()}`,
      vendor_name: vendorNames[vendor_id] || 'Third-Party Vendor',
      breach_type,
      propagation: {
        vault_entries_compromised: ['aws_access_key_prod', 'aws_secret_key_prod'],
        systems_at_risk: ['cloud_storage', 'database', 'backup_server'],
        estimated_exposure_time: '14 days',
        data_at_risk: 'All production data on AWS infrastructure',
      },
      alerts_created: 3,
      score_impact: -20,
      bpi_change: 25,
      remediation_workflow: [
        {
          step: 1,
          action: 'Revoke compromised credentials immediately',
          status: 'pending',
        },
        {
          step: 2,
          action: 'Generate and deploy new credentials',
          status: 'pending',
        },
        {
          step: 3,
          action: 'Audit access logs for unauthorized usage',
          status: 'pending',
        },
        {
          step: 4,
          action: 'Implement IP whitelisting',
          status: 'pending',
        },
        {
          step: 5,
          action: 'Add MFA requirement to vendor contract',
          status: 'pending',
        },
      ],
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
