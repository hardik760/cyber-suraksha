# Testing Guide

## Automated Testing

```bash
npm run lint          # Code linting
npm run type-check    # TypeScript validation
npm run build         # Production build test
```

## Manual Testing Checklist

### Dashboard Page
- [ ] Cyber Health Score displays (78/100)
- [ ] BPI displays (23%)
- [ ] Quick stats load (sites scanned, threats blocked)
- [ ] Security categories show with progress bars
- [ ] Recent alerts list shows last 5 alerts
- [ ] Category details display correctly

### Attack Scenarios Page
- [ ] All 4 scenario cards display
- [ ] Clicking "Launch Simulation" navigates to Digital Twin
- [ ] Simulation data stored in session storage
- [ ] Impact and duration badges show correctly

### Digital Twin Page
- [ ] Network graph renders with 8 nodes
- [ ] "Start Simulation" button triggers animation
- [ ] Nodes change color during infection (blue → red)
- [ ] Event timeline updates as simulation progresses
- [ ] Impact metrics display correctly
- [ ] Simulation completes and shows final state

### Alerts Page
- [ ] Alerts list displays
- [ ] Filter chips work (All, Critical, High, Medium, Low)
- [ ] Clicking alert shows details in right panel
- [ ] Severity badges color-coded correctly
- [ ] Timestamps formatted properly

### Password Vault Page
- [ ] Password input field accepts text
- [ ] "Check Strength" button calculates entropy
- [ ] Strength meter displays with correct color
- [ ] Weak password shows issues list
- [ ] "Generate Strong Password" creates passphrase
- [ ] Character sets indicators show correctly

### Authenticator Page
- [ ] Approval requests display with app name and location
- [ ] "Approve" button removes request
- [ ] "Deny" button removes request
- [ ] OTP codes display (6 digits each)
- [ ] Recovery codes grid displays 10 codes

### Vendors Page
- [ ] Vendors table loads with all vendors
- [ ] Risk levels color-coded (low=green, medium=yellow, high=red)
- [ ] "Simulate Breach" opens modal
- [ ] Breach type dropdown populates
- [ ] Launching breach navigates to Digital Twin

### Extension Simulation Page
- [ ] URL input field accepts URLs
- [ ] "Check Website" button calls API
- [ ] Safe site shows green success message
- [ ] Dangerous site shows red warning
- [ ] Quick test buttons populate input field
- [ ] Threats display as badges

### AI Chatbot
- [ ] Clicking widget opens chat window
- [ ] Sending message receives response
- [ ] Chat history persists during session
- [ ] Minimize button collapses widget
- [ ] Messages display with correct alignment (user right, bot left)

### Mode Detection
- [ ] Banner displays at top of pages
- [ ] Demo mode shows correct message
- [ ] Banner color matches mode

## Cross-Browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

## Mobile Responsive Testing

Test on:
- [ ] iPhone (iOS Safari)
- [ ] Android (Chrome)
- [ ] Tablet (iPad / Android tablet)

Check:
- [ ] Sidebar behavior on mobile
- [ ] Cards stack vertically on small screens
- [ ] Buttons remain clickable
- [ ] Text remains readable

## Performance Testing

- [ ] Page load time < 3 seconds (First Contentful Paint)
- [ ] Simulation animation smooth (60fps)
- [ ] No console errors
- [ ] API responses < 1 second (except AI chat)

## Security Testing

- [ ] No API keys visible in browser DevTools → Network tab
- [ ] No API keys visible in page source (View Source)
- [ ] HTTPS enforced on deployed version
- [ ] Security headers present in response headers
- [ ] No console warnings about security issues

---

**Report Issues:** GitHub Issues or security@example.com for vulnerabilities
