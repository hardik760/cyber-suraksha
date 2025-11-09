/**
 * Key Manager - Centralized Secure API Key Management
 *
 * SECURITY RULES:
 * 1. Keys ONLY accessed from API routes (server-side)
 * 2. Keys NEVER returned in API responses
 * 3. Keys NEVER logged to console or files
 * 4. Automatic mode detection based on key presence
 */

type Mode = 'prod' | 'demo';

let cachedMode: Mode | null = null;

/**
 * Detect application mode based on API key availability
 * Returns 'prod' if ALL keys are available, 'demo' otherwise
 */
export function getMode(): Mode {
  if (cachedMode) {
    return cachedMode;
  }

  // Check for presence of critical API keys
  const hasOpenAI = !!process.env.OPENAI_API_KEY;
  const hasSafeBrowsing = !!process.env.GOOGLE_SAFE_BROWSING_KEY;
  const hasSupabase = !!(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY);

  // If ANY critical key is missing, run in demo mode
  // VirusTotal is optional, so we don't check it for mode detection
  if (hasOpenAI && hasSafeBrowsing && hasSupabase) {
    cachedMode = 'prod';
  } else {
    cachedMode = 'demo';
  }

  return cachedMode;
}

/**
 * Get OpenAI API key (server-side only)
 * @returns API key or null if not available
 */
export function getOpenAIKey(): string | null {
  if (typeof window !== 'undefined') {
    throw new Error('getOpenAIKey() cannot be called from client-side');
  }
  return process.env.OPENAI_API_KEY || null;
}

/**
 * Get Google Safe Browsing API key (server-side only)
 * @returns API key or null if not available
 */
export function getSafeBrowsingKey(): string | null {
  if (typeof window !== 'undefined') {
    throw new Error('getSafeBrowsingKey() cannot be called from client-side');
  }
  return process.env.GOOGLE_SAFE_BROWSING_KEY || null;
}

/**
 * Get VirusTotal API key (server-side only)
 * @returns API key or null if not available
 */
export function getVirusTotalKey(): string | null {
  if (typeof window !== 'undefined') {
    throw new Error('getVirusTotalKey() cannot be called from client-side');
  }
  return process.env.VIRUSTOTAL_API_KEY || null;
}

/**
 * Get Supabase configuration (server-side only)
 * @returns Config object or null if not available
 */
export function getSupabaseConfig(): { url: string; anonKey: string } | null {
  if (typeof window !== 'undefined') {
    throw new Error('getSupabaseConfig() cannot be called from client-side');
  }

  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (url && anonKey) {
    return { url, anonKey };
  }

  return null;
}

/**
 * Check if running in production mode
 */
export function isProdMode(): boolean {
  return getMode() === 'prod';
}

/**
 * Check if running in demo mode
 */
export function isDemoMode(): boolean {
  return getMode() === 'demo';
}
