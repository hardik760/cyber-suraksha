import { NextRequest, NextResponse } from 'next/server';
import { getMode, getSafeBrowsingKey, getVirusTotalKey } from '@/lib/keyManager';
import { getDemoData } from '@/lib/demoData';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    const mode = getMode();

    if (mode === 'prod') {
      // Production mode: Call real APIs
      return await checkUrlProd(url);
    } else {
      // Demo mode: Use demo_data.json
      return checkUrlDemo(url);
    }
  } catch (error) {
    console.error('Error in check-url API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function checkUrlProd(url: string) {
  const safeBrowsingKey = getSafeBrowsingKey();
  const virusTotalKey = getVirusTotalKey();

  let riskScore = 0;
  const reasons: string[] = [];
  const threats: string[] = [];
  let safe = true;

  try {
    // Check with Google Safe Browsing API
    if (safeBrowsingKey) {
      const safeBrowsingResponse = await fetch(
        `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${safeBrowsingKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            client: {
              clientId: 'cyber-suraksha',
              clientVersion: '1.0.0',
            },
            threatInfo: {
              threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE', 'POTENTIALLY_HARMFUL_APPLICATION'],
              platformTypes: ['ANY_PLATFORM'],
              threatEntryTypes: ['URL'],
              threatEntries: [{ url }],
            },
          }),
        }
      );

      if (safeBrowsingResponse.ok) {
        const data = await safeBrowsingResponse.json();
        if (data.matches && data.matches.length > 0) {
          safe = false;
          riskScore += 50;
          reasons.push('Flagged by Google Safe Browsing');
          threats.push('phishing', 'malware');
        }
      }
    }

    // Check with VirusTotal API (if available)
    if (virusTotalKey) {
      const vtResponse = await fetch(
        `https://www.virustotal.com/api/v3/urls`,
        {
          method: 'POST',
          headers: {
            'x-apikey': virusTotalKey,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `url=${encodeURIComponent(url)}`,
        }
      );

      if (vtResponse.ok) {
        const vtData = await vtResponse.json();
        const analysisId = vtData.data.id;

        // Get analysis results
        const analysisResponse = await fetch(
          `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
          {
            headers: { 'x-apikey': virusTotalKey },
          }
        );

        if (analysisResponse.ok) {
          const analysisData = await analysisResponse.json();
          const stats = analysisData.data.attributes.stats;

          if (stats.malicious > 0) {
            safe = false;
            riskScore += 40;
            reasons.push(`Detected as malicious by ${stats.malicious} engines`);
            threats.push('malware');
          }
        }
      }
    }

    // If no threats found
    if (safe) {
      reasons.push('No known threats detected');
    }

    return NextResponse.json({
      safe,
      risk_score: riskScore,
      reasons,
      block_recommended: riskScore > 50,
      threats,
      scanned_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error checking URL in prod mode:', error);
    return NextResponse.json(
      { error: 'External API failure' },
      { status: 500 }
    );
  }
}

function checkUrlDemo(url: string) {
  const demoData = getDemoData();
  const urlChecks = demoData.url_checks;

  // Check if URL exists in demo data
  const result = urlChecks[url];

  if (result) {
    return NextResponse.json(result);
  }

  // Default: mark as safe if not in demo data
  return NextResponse.json({
    safe: true,
    risk_score: 0,
    reasons: ['No threats detected (demo mode)'],
    block_recommended: false,
    threats: [],
    scanned_at: new Date().toISOString(),
  });
}
