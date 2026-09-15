# ByteMe CTF — OWASP PCCOE Student Chapter

> **Trap the flag. Free the soul.**  
> Official capture-the-flag platform and landing experience for ByteMe CTF, organized by the **OWASP PCCOE Student Chapter**.

---

## 🌟 Overview & Features

- **Interactive 3D Soul Stone**: Real-time WebGL shader stone built with `@react-three/fiber`, `@react-three/drei`, and custom Three.js geometry with rotational physics and drag interactivity.
- **Soul Embers Particle Cursor**: Custom canvas particle system emitting ambient soul wisps and mouse click bursts.
- **Live Signal Countdown**: Precision countdown to October 17, 2026, 10:00 AM IST.
- **Interactive Soul Altar Terminal**: An on-page cyber terminal allowing hackers to test trial flags (e.g. `byteme{s0ul_fr4gm3nt_unl0ck3d}`), inspect the console, and decode base64 signals with real-time feedback.
- **Team Transmission Gate (Registration Modal)**: Interactive team registration with validation and automated generation of a **Digital Soul Pass / Ticket** stored in `localStorage`.
- **Official Rules & Dynamic Scoring Modal**: Outlines Jeopardy format, decay curves, and ethical code of conduct.
- **7 Challenge Disciplines**: Web, Cryptography, Binary Exploitation, Reverse Engineering, Digital Forensics, OSINT, and Misc.
- **Interactive Shard Lore**: 7 splintered soul fragments matching each competition category.
- **Searchable FAQ**: Instant keyword filter across event questions.
- **Mobile Responsive**: Slide-out navigation drawer and touch-friendly controls.

---

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173` to explore the live site.

### Production Build

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📦 Deployment Instructions

The repository is pre-configured with deployment manifests for all major hosting platforms:

### 1. Vercel (Recommended)
`vercel.json` is included at the root with SPA rewrites and caching headers.
```bash
# Using Vercel CLI
npx vercel

# Or push to GitHub and connect repository in the Vercel Dashboard:
# Framework Preset: Vite
# Build Command: npm run build
# Output Directory: dist
```

### 2. Netlify
`netlify.toml` is pre-configured with build commands, redirects, and security headers.
```bash
# Connect repository on Netlify:
# Build command: npm run build
# Publish directory: dist
```

### 3. GitHub Pages
A GitHub Actions workflow is located at `.github/workflows/deploy.yml`.
1. Go to repository **Settings** → **Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main` branch to trigger automatic build and deployment.

---

## 🛡️ Competition Details

- **Dates**: October 17–18, 2026 (36 Hours)
- **Format**: Jeopardy Dynamic Scoring (500 pts down to 100 pts)
- **Flag Format**: `byteme{...}`
- **Team Size**: 1–4 Members
- **Organizer**: OWASP PCCOE Student Chapter, Pune
- **Contact**: owasp@pccoepune.org
