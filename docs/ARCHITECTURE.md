# System Architecture

## High-Level Overview

Cyber-Suraksha OPS is a full-stack Next.js application with server-side API handling, PostgreSQL database, and real-time network visualizations.

## Technology Stack

**Frontend:**
- Next.js 14 (React 18, App Router)
- TypeScript for type safety
- Tailwind CSS for styling
- Cytoscape.js for network graphs

**Backend:**
- Next.js API Routes (serverless functions)
- Server-side API key management
- Mode auto-detection (prod vs demo)

**Database:**
- Supabase (PostgreSQL)
- Tables: alerts, simulations, vendors, credentials, activity_logs

**External APIs (Production Mode):**
- OpenAI GPT (AI chatbot)
- Google Safe Browsing (phishing detection)
- VirusTotal (malware scanning)

**Deployment:**
- Vercel (frontend + backend)
- GitHub Actions (CI/CD)
- Automatic deployments on push to main

## System Diagram

```
[User Browser] ← HTTPS → [Vercel CDN]
                              ↓
                    [Next.js Frontend]
                              ↓
                    [Next.js API Routes] ← Secure Keys
                              ↓
            ┌─────────────────┴───────────────────┐
            ↓                 ↓                   ↓
      [OpenAI API]    [Safe Browsing]    [VirusTotal]
            ↓
      [Supabase PostgreSQL]
```

## Data Flow

**Example: Running a Phishing Simulation**

1. User clicks "Launch Phishing Simulation" on /scenarios page
2. Frontend sends POST /api/run-simulation with scenario="phishing_attack"
3. API route calls attack propagation algorithm
4. Algorithm generates events array with timestamps
5. Events stored in Supabase simulations table (prod) or returned directly (demo)
6. Response sent to frontend with simulation_id
7. User navigated to /digital-twin?sim=abc123
8. Digital Twin page receives events and plays animation using Cytoscape
9. As nodes get infected, score updates sent to /api/score endpoint
10. Real-time score changes reflected across all open tabs

## Security Architecture

**Key Management:**
```
.env (never committed) → Vercel Env Vars → lib/keyManager.ts → API Routes
                                               ↓
                                     Auto-detect → prod/demo mode
```

**Frontend:** Zero access to API keys, only calls backend endpoints
**Backend:** All external API calls, key validation, response sanitization

## Performance Optimizations

- Next.js image optimization for assets
- Cytoscape graph rendering on client-side only (useEffect)
- API route caching for static responses (demo mode)
- Supabase connection pooling
- Vercel edge network CDN

## Scalability

**Current Capacity:**
- Concurrent users: ~1,000 (Vercel Hobby plan, upgrade for more)
- Database: 500MB (Supabase free tier, scales to terabytes)
- API rate limits: Handled by external services (OpenAI, etc.)

**Horizontal Scaling:**
- Vercel auto-scales serverless functions
- Supabase connection pooler handles concurrent queries
- CDN distributes static assets globally

---

For detailed implementation specifications, see planning.md (internal document).
