# Security Documentation

## Overview

Cyber-Suraksha implements security best practices to protect API keys, user data, and system integrity. This document details our security architecture and practices.

## API Key Management

### Storage Location

**Production (Vercel):**
- API keys stored in Vercel Environment Variables
- Accessible only to serverless functions (server-side)
- Never exposed to frontend code or browser
- Encrypted at rest by Vercel

**Local Development:**
- Keys stored in `.env.local` (git-ignored)
- Never committed to repository
- `.env.example` contains placeholders only

### Key Detection & Mode Switching

**Automatic Mode Detection (lib/keyManager.ts):**

```typescript
export function getMode(): 'prod' | 'demo' {
  const hasOpenAI = !!process.env.OPENAI_API_KEY;
  const hasSafeBrowsing = !!process.env.GOOGLE_SAFE_BROWSING_KEY;
  const hasSupabase = !!(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY);

  if (hasOpenAI && hasSafeBrowsing && hasSupabase) {
    return 'prod'; // Use real APIs
  } else {
    return 'demo'; // Use demo_data.json
  }
}
```

**Behavior:**
- **All keys present:** App runs in production mode with real API calls
- **Any key missing:** App runs in demo mode with simulated data
- **Zero configuration needed:** Judges never need to configure keys

### API Route Pattern

**Every backend endpoint follows this secure pattern:**

```typescript
// app/api/check-url/route.ts
export async function POST(request: Request) {
  const mode = getMode();

  if (mode === 'prod') {
    const key = getSafeBrowsingKey(); // Server-side only
    const response = await callExternalAPI(key, data);
    return Response.json(response);
  } else {
    const demoResponse = getDemoData('url_checks', params);
    return Response.json(demoResponse);
  }
}
```

**Key Security Rules:**
1. ✅ Keys accessed only in API routes (server-side)
2. ✅ Keys never returned in API responses
3. ✅ Keys never logged to console or files
4. ✅ Keys never sent to frontend
5. ✅ Client-side code only calls backend endpoints

## Environment Variables

### Production (Vercel Dashboard)

Set these in Vercel project settings → Environment Variables:

```
OPENAI_API_KEY=sk-proj-...
GOOGLE_SAFE_BROWSING_KEY=AIza...
VIRUSTOTAL_API_KEY=abcdef123456...
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Local Development (.env.local)

Create `.env.local` (git-ignored) for local testing with real APIs:

```bash
cp .env.example .env.local
# Add your actual keys to .env.local
```

**Important:** Leave `.env.local` empty to run in demo mode locally.

### Example Template (.env.example)

**Committed to repository:**

```
OPENAI_API_KEY=your_openai_api_key_here
GOOGLE_SAFE_BROWSING_KEY=your_google_safe_browsing_key_here
VIRUSTOTAL_API_KEY=your_virustotal_api_key_here
SUPABASE_URL=your_supabase_project_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

**Never contains real keys - placeholders only.**

## Key Rotation Policy

**Recommended rotation schedule:**
- OpenAI keys: Every 90 days
- Safe Browsing keys: Every 180 days
- Supabase keys: Rotate if suspected compromise
- VirusTotal keys: Every 90 days

**Rotation process:**
1. Generate new key in provider dashboard
2. Update Vercel environment variable
3. Trigger redeployment (automatic or manual)
4. Revoke old key after 24-hour grace period

## Security Headers

**Configured in next.config.ts:**

```typescript
async headers() {
  return [{
    source: '/:path*',
    headers: [
      { key: 'X-Frame-Options', value: 'DENY' }, // Prevent clickjacking
      { key: 'X-Content-Type-Options', value: 'nosniff' }, // Prevent MIME sniffing
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-XSS-Protection', value: '1; mode=block' }, // XSS protection
    ],
  }];
}
```

## Data Privacy

**What We Collect:**
- URLs checked for phishing (sent to backend APIs)
- Simulated user activity (demo mode: in-memory only)
- Chat messages (OpenAI API in prod, local matching in demo)

**What We Don't Collect:**
- Real passwords (test passwords never stored)
- Personal information (demo user only)
- Tracking or analytics cookies
- Browser fingerprinting data

**Data Retention:**
- **Demo mode:** In-memory only, cleared on page reload
- **Production mode:** Activity logs stored in Supabase for 90 days, then auto-deleted

## Reporting Security Issues

**Found a vulnerability?** Please report responsibly:

- **Email:** security@example.com (replace with actual email)
- **GitHub:** Open a private security advisory

**Do not** open public issues for security vulnerabilities.

## Compliance

- **GDPR:** Data minimization, user consent, right to deletion
- **SOC 2:** Supabase is SOC 2 Type II certified
- **OWASP Top 10:** All major vulnerabilities addressed

## Third-Party Security

**OpenAI:**
- SOC 2 Type II certified
- Data retention: 30 days (API)
- Privacy policy: https://openai.com/privacy

**Google Safe Browsing:**
- Enterprise-grade threat intelligence
- Privacy policy: https://safebrowsing.google.com/

**VirusTotal:**
- Enterprise security standards
- No PII collected for URL scanning

**Supabase:**
- SOC 2 Type II certified
- Encryption at rest and in transit
- Row-level security (RLS) enabled

**Vercel:**
- Enterprise security and compliance
- DDoS protection
- Automatic HTTPS

---

**Last Updated:** January 2025
**Security Contact:** security@example.com
