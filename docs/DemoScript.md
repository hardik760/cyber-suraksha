# Demo Script - 3-Minute Walkthrough

## Minute 1: Understanding Current Security Posture

**Navigate to Dashboard (/):**

1. **Cyber Health Score:** Point out the 78/100 score and B grade
   - "This organization has good security but room for improvement"

2. **Breach Probability Index:** Highlight 23% BPI
   - "This is the likelihood of a successful breach based on current vulnerabilities"

3. **Security Categories:** Scroll through the 7 categories
   - Password Security: 70% (needs improvement - 28% weak passwords)
   - Backup Strategy: 93% (excellent)
   - Vendor Risk: 60% (3 vendors lack assessments)

4. **Recent Alerts:** Show the chronological alert list
   - Phishing email blocked
   - Weak password detected
   - Vendor credentials compromised

**Key Message:** "Cyber-Suraksha gives non-technical teams a clear view of their security posture."

---

## Minute 2: Simulating a Cyberattack

**Navigate to Attack Scenarios (/scenarios):**

1. **Select Phishing Attack:**
   - "This simulates an employee clicking a malicious email link"
   - Click "Launch Simulation"

2. **Watch Digital Twin Visualization:**
   - Network graph with 8 nodes appears
   - Click "Start Simulation" button
   - Watch nodes change color:
     - Blue (healthy) → Amber (scanning) → Red (infected)
   - Point out the propagation path:
     - Employee Workstation → Email Server → Database

3. **Observe Impact:**
   - Score drops from 78 to 53 (-25 points)
   - BPI increases from 23% to 38% (+15%)
   - 3 systems compromised in 45 seconds

4. **Event Timeline:**
   - Show step-by-step event descriptions
   - "Phishing email opened, credentials entered"
   - "Stolen credentials used to access email server"
   - "Customer database accessed and copied"

**Key Message:** "Visual learning helps non-technical staff understand how one click can cascade."

---

## Minute 3: Remediation & AI Assistance

**Test Password Vault (/vault):**

1. **Enter "password123":**
   - Entropy: 41.5 bits (moderate but weak)
   - Issues highlighted: common pattern, predictable

2. **Click "Generate Strong Password":**
   - Passphrase generated: "Correct-Horse-Battery-Staple-89"
   - Entropy: 85 bits (very strong)

**Test Extension Simulation (/extension):**

1. **Enter "http://evil-phishing-site.com":**
   - Red warning appears
   - Risk Score: 95/100
   - Threats: phishing, credential theft
   - "BLOCKED - Dangerous Site"

**Open AI Chatbot (Bottom Right):**

1. **Click the 💬 button**
2. **Ask: "What should I do about the vendor breach alert?"**
   - AI provides immediate guidance:
     - Revoke compromised credentials
     - Generate new keys
     - Audit access logs
     - Enable MFA

3. **Ask: "How do I enable 2FA?"**
   - Step-by-step explanation
   - Links to authenticator page

**Key Message:** "AI assistant provides 24/7 guidance in simple language for non-technical users."

---

## Key Takeaways for Judges

1. **Zero Configuration:** Works immediately - no setup required
2. **Visual Learning:** Digital Twin makes abstract attacks concrete
3. **Interactive:** Hands-on simulations beat passive training
4. **AI-Powered:** Real-time guidance and threat analysis
5. **Secure:** API keys never exposed, all processing server-side
6. **Production-Ready:** Deployed on Vercel with automatic scaling

---

## Additional Features to Explore (Optional)

**Authenticator (/authenticator):**
- Simulate 2FA approval requests
- Generate OTP codes (regenerate every 30 seconds)
- View recovery backup codes

**Vendors (/vendors):**
- View vendor security scores
- Simulate vendor breaches (exposed credentials, CVE exploit, etc.)
- Watch vendor compromise propagate to internal systems

**Alerts (/alerts):**
- Filter by severity (critical, high, medium, low)
- View detailed alert information
- Mark alerts as resolved

---

**Total Demo Time:** 3 minutes
**Full Feature Exploration:** 10-15 minutes

**Judges:** All features work identically whether you're using the live deployment or running locally. The experience is seamless.
