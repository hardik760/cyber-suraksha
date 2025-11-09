# 🛡️ Cyber-Suraksha OPS

**Full-Stack AI-Powered Cyber Defence Simulator for MSMEs**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/hardik760/cyber-suraksha)

## 📋 Overview

Cyber-Suraksha OPS is an interactive cybersecurity simulator that demonstrates common cyberattacks, visualizes their impact through a Digital Twin sandbox, and educates non-technical staff through AI-powered guidance. Built for judges and MSMEs to understand and improve their security posture.

**🌐 Live Demo:** [https://cyber-suraksha-demo.vercel.app](https://cyber-suraksha-demo.vercel.app) *(Deploy to get your URL)*

**✅ Zero Configuration Required:** All features work out-of-the-box. API keys are managed securely server-side.

## 🚀 Quick Start for Judges

### Option 1: Access Live Deployment (Recommended)
Simply visit the deployed URL above. All features are immediately available:
- ✅ AI chatbot with real-time guidance
- ✅ Phishing and malware detection
- ✅ Attack simulations with visual propagation
- ✅ Vendor breach scenarios
- ✅ Password strength testing
- ✅ 2FA authenticator simulation

**No setup, no API keys, no installation required.**

### Option 2: Run Locally (Optional)
```bash
# Clone repository
git clone https://github.com/hardik760/cyber-suraksha.git
cd cyber-suraksha

# Install dependencies
npm install

# Run in demo mode (no keys needed)
npm run dev
```

Visit `http://localhost:3000` - **App automatically runs in demo mode with simulated data.**

## 🎮 Demo Walkthrough (3 Minutes)

### Minute 1: Security Overview
1. **Dashboard** shows Cyber Health Score (78/100), Breach Probability Index (23%), and security categories
2. Review recent alerts and quick statistics
3. Explore category breakdowns (password security, patching, backups, etc.)

### Minute 2: Attack Simulation
1. Navigate to **Attack Scenarios**
2. Launch a **Phishing Attack** simulation
3. Watch the **Digital Twin** visualization show real-time attack propagation
4. See nodes turn red as systems get compromised
5. Observe score impact and breach probability changes

### Minute 3: Interactive Features
1. Test **Password Vault** - enter "password123" to see entropy analysis
2. Try **Extension Simulation** - scan "http://evil-phishing-site.com"
3. Open **AI Chatbot** (bottom right) - ask "What is phishing?"
4. Simulate **Vendor Breach** from Vendors page

## 🏗️ Architecture

```
Frontend (Next.js 14 + React + Tailwind)
    ↓ HTTPS
Backend API Routes (Next.js Serverless)
    ↓ (Secure server-side only)
External APIs: OpenAI, Safe Browsing, VirusTotal
    ↓
Database: Supabase (PostgreSQL)
```

**Technology Stack:**
- **Framework:** Next.js 14 (App Router)
- **Frontend:** React 18, TypeScript, Tailwind CSS
- **Visualization:** Cytoscape.js (network graphs)
- **Backend:** Next.js API Routes (serverless)
- **Database:** Supabase
- **Deployment:** Vercel
- **AI:** OpenAI GPT-3.5/4

## 🔐 Security & Key Management

**Critical:** API keys are **NEVER** exposed to the frontend or repository.

- ✅ Keys stored in Vercel environment variables (production)
- ✅ Keys accessed only from API routes (server-side)
- ✅ Auto-detection: App runs in demo mode when keys unavailable
- ✅ Fallback: `demo_data.json` provides realistic responses
- ✅ `.env.example` contains placeholders only

**For Judges:** You'll never see or need to configure keys. Everything works automatically.

See [docs/SECURITY.md](./docs/SECURITY.md) for complete security documentation.

## 📊 Core Algorithms

### Password Entropy Calculation
```
H = L × log₂(N)
```
- L = password length
- N = character set size (26 lowercase + 26 uppercase + 10 digits + 32 special)
- Strength levels: <25 (weak), 25-40 (moderate), 40-60 (strong), 60-80 (very strong), 80+ (excellent)

### Cyber Health Score
Weighted calculation across 7 categories (total 100 points):
- Patch Management: 20 points
- Password Security: 20 points
- Backup Strategy: 15 points
- Email Security: 15 points
- Monitoring: 10 points
- Incident Response: 10 points
- Vendor Risk: 10 points

### Breach Probability Index (BPI)
AI-driven risk model combining:
- Current vulnerabilities count
- Recent attack success rates
- Patch compliance percentage
- Vendor security scores
- Historical incident data

## 🧩 Features in Detail

### Attack Simulations
- **Phishing Attack:** Email credential theft → lateral movement
- **Weak Password:** Brute force → privilege escalation
- **Ransomware:** File encryption → network propagation
- **Vendor Breach:** Third-party compromise → data exfiltration

### Digital Twin Sandbox
- Real-time network visualization with 8 node types
- Animated attack propagation (blue → amber → red)
- Interactive remediation (patch, 2FA, restore, isolate)
- Live score and BPI updates

### AI Security Assistant
- Context-aware chatbot
- Real-time threat explanations
- Actionable remediation steps
- Activity summary integration

### Browser Extension
- Pre-navigation URL scanning
- Phishing and malware detection
- Safe Browsing API integration
- Real-time threat warnings

## 📁 Project Structure

```
cyber-suraksha/
├── app/                      # Next.js pages and API routes
│   ├── api/                 # Backend endpoints (server-side)
│   │   ├── check-url/       # URL phishing/malware scan
│   │   ├── detect-email/    # Email phishing detection
│   │   ├── chat/            # AI chatbot
│   │   ├── score/           # Cyber health score
│   │   ├── alerts/          # Security alerts
│   │   ├── run-simulation/  # Attack simulations
│   │   └── vendor-breach/   # Vendor risk simulation
│   ├── dashboard/           # Main dashboard
│   ├── scenarios/           # Attack scenario selector
│   ├── digital-twin/        # Network visualization
│   ├── alerts/              # Alert management
│   ├── vault/               # Password testing
│   ├── authenticator/       # 2FA simulation
│   ├── vendors/             # Vendor risk management
│   └── extension/           # Extension simulator
├── components/              # Reusable React components
│   ├── layout/             # Sidebar, layout wrappers
│   ├── ui/                 # Buttons, cards, modals
│   └── chat/               # AI chatbot widget
├── lib/                     # Utility functions
│   ├── keyManager.ts       # Secure API key management
│   └── demoData.ts         # Demo mode data loader
├── public/
│   └── demo_data.json      # Fallback data for demo mode
├── docs/                    # Documentation
│   ├── DemoScript.md       # 3-minute walkthrough
│   ├── SECURITY.md         # Security practices
│   ├── ARCHITECTURE.md     # System design
│   └── TESTING.md          # Testing guide
├── .env.example            # Environment variable template
├── next.config.ts          # Next.js configuration
└── tailwind.config.ts      # Tailwind CSS setup
```

## 🧪 Testing

**Manual Testing:**
```bash
npm run dev
```
Visit all pages:
- `/dashboard` - Score and alerts
- `/scenarios` - Launch simulations
- `/digital-twin` - Network visualization
- `/alerts` - Alert filtering
- `/vault` - Password testing
- `/authenticator` - 2FA simulation
- `/vendors` - Vendor breach simulation
- `/extension` - URL scanning

**Automated Testing:**
```bash
npm run lint        # Code linting
npm run type-check  # TypeScript validation
npm run build       # Production build test
```

See [docs/TESTING.md](./docs/TESTING.md) for complete testing checklist.

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Fork/Clone this repository**

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Vercel auto-detects Next.js

3. **Add Environment Variables** (in Vercel Dashboard):
   ```
   OPENAI_API_KEY=sk-...
   GOOGLE_SAFE_BROWSING_KEY=AIza...
   VIRUSTOTAL_API_KEY=...
   SUPABASE_URL=https://...
   SUPABASE_ANON_KEY=eyJ...
   ```

4. **Deploy:** Vercel builds and deploys automatically

**Without keys:** App runs in demo mode (fully functional with simulated data)
**With keys:** App runs in production mode (real API calls)

### Environment Variables

See `.env.example` for required variables. Keys are **optional** - app works without them in demo mode.

## 📖 Documentation

- [DemoScript.md](./docs/DemoScript.md) - 3-minute judge walkthrough
- [SECURITY.md](./docs/SECURITY.md) - API key management and security practices
- [ARCHITECTURE.md](./docs/ARCHITECTURE.md) - System architecture and design
- [TESTING.md](./docs/TESTING.md) - Manual and automated testing guide

## 🤝 Contributing

This is a hackathon project. For improvements or issues:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - See LICENSE file for details

## 👥 Team

Built for MSME cybersecurity education and awareness.

## 🙏 Acknowledgments

- **OpenAI** for AI chatbot capabilities
- **Google Safe Browsing** for phishing detection
- **VirusTotal** for malware scanning
- **Supabase** for database infrastructure
- **Vercel** for hosting and deployment
- **Cytoscape.js** for network visualization

---

**🎯 For Judges:** This project demonstrates a production-ready, secure, and fully functional cybersecurity simulator. All features work immediately at the deployed URL. No configuration or setup required.

**Questions?** Open an issue or contact via GitHub.
