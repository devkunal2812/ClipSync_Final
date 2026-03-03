# ⚡ ClipSync v3.0

**Secure cross-device clipboard transfer — E2E encrypted, ephemeral sessions, zero server storage.**

Share text, code, and files between any two devices in seconds. No account. No installation. Just open, pair, and share.

![ClipSync Preview](https://img.shields.io/badge/version-3.0.0-black?style=flat-square) ![React](https://img.shields.io/badge/React-18-black?style=flat-square&logo=react) ![Vite](https://img.shields.io/badge/Vite-5-black?style=flat-square&logo=vite) ![License](https://img.shields.io/badge/license-MIT-black?style=flat-square)

---

## ✨ Features

- 🔐 **End-to-end encrypted** — ECDH key exchange + AES-256-GCM encryption via WebCrypto API
- ⏱ **Ephemeral sessions** — Auto-expire after 30 minutes, keys destroyed on disconnect
- 📁 **File transfer** — Drag & drop with progress bar. Blocked: `.exe`, `.apk`, `.bat`, `.sh` (max 100MB)
- 💻 **Code sharing** — 14 languages with syntax-highlighted display
- 🤖 **AI Smart Actions** — Optional Claude analysis of any transfer (manual opt-in, confirmation required)
- 👁 **Secure Send** — Content auto-deleted from feed after first view
- 📋 **Clipboard Mirror** — Auto-sync clipboard between devices
- 🎨 **5 themes** — Obsidian, Marble, Void, Chalk, Steel — each with its own font pair and 3D depth
- 🧊 **3D card system** — Mouse-tracked perspective tilt on all cards and modals
- 📱 **Fully responsive** — Desktop sidebar + feed, mobile bottom-sheet panel with tab bar
- 🔍 **Transfer history** — In-session search, memory-only (no server)
- 📡 **QR pairing** — Auto-generated QR code for instant peer connection

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+

### Install & Run
```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/clipsync.git
cd clipsync

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
# → Opens at http://localhost:5173
```

### Build for Production
```bash
npm run build
# → Output in /dist — ready to deploy
npm run preview
# → Preview production build locally
```

---

## 🌐 Deploy to Vercel (Recommended)

### Option A — One-click via GitHub
1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo
4. Vercel auto-detects Vite — click **Deploy**
5. Done! Live at `https://your-project.vercel.app`

### Option B — Vercel CLI
```bash
npm i -g vercel
vercel
# Follow prompts → deployed in ~60 seconds
```

### Deploy to Netlify
```bash
# Build first
npm run build

# Drag the /dist folder to netlify.com/drop
# OR connect your GitHub repo in Netlify dashboard
```

---

## 🗂 Project Structure

```
clipsync/
├── public/
│   └── favicon.svg          # Lightning bolt favicon
├── src/
│   ├── main.jsx             # React DOM entry point
│   └── App.jsx              # Complete application (single-file architecture)
│       ├── THEMES           # 5 theme definitions (Obsidian, Marble, Void, Chalk, Steel)
│       ├── GlobalStyles     # Injected CSS + responsive breakpoints
│       ├── Card3D           # Mouse-tracked 3D tilt wrapper
│       ├── Ico              # SVG icon library (20+ icons)
│       ├── QRSvg            # Deterministic QR code generator
│       ├── Header           # Sticky header with status, theme switcher
│       ├── HomeScreen       # Landing page with 3D hero cards
│       ├── SessionScreen    # Split panel session UI (responsive)
│       ├── LeftPanel        # Input panel (Text / Code / File tabs)
│       ├── TransferCard     # Individual transfer item with AI actions
│       ├── QRModal          # QR code + countdown timer
│       ├── ScanModal        # Join session UI
│       ├── Sidebar          # History sidebar with search
│       └── App              # Root state management
├── index.html               # HTML entry point
├── vite.config.js           # Vite + React config
├── netlify.toml             # Netlify deployment config
├── vercel.json              # Vercel deployment config
├── .gitignore
└── package.json
```

---

## 🎨 Themes

| Theme | Background | Font | Personality |
|-------|-----------|------|-------------|
| **Obsidian ◆** | `#080808` | Space Grotesk + Space Mono | Deep black, neon green accents |
| **Marble ○** | `#f4f4f2` | Cormorant Garamond + IBM Plex Mono | Pure white, editorial serif |
| **Void ▣** | `#000000` | Bebas Neue + Fira Code | True black, electric green |
| **Chalk ●** | `#12122a` | DM Sans + JetBrains Mono | Midnight blue, cyan glow |
| **Steel ▲** | `#0c0c0e` | Syne + Roboto Mono | Dark gunmetal, lavender tones |

Switch themes live via the palette icon in the header — no page reload.

---

## 📱 Responsive Breakpoints

| Width | Layout |
|-------|--------|
| **≥1025px** | Full 380px sidebar + feed panel side by side |
| **768–1024px** | Narrower 320px sidebar, header text collapses |
| **≤768px** | 290px sidebar, duration and labels hidden |
| **≤640px** | Full mobile — feed fills screen, Send panel slides up from bottom |
| **≤430px** | Optimised for small phones, pills/fonts scale down |

---

## 🔐 Security Architecture

| Layer | Implementation |
|-------|---------------|
| **Key Exchange** | ECDH P-256 via `crypto.subtle` |
| **Encryption** | AES-256-GCM with random IV per message |
| **Fingerprint** | First 32 chars of combined public keys (6 groups) |
| **Session Scope** | Keys stored in `useRef`, destroyed on disconnect |
| **Session Expiry** | Hard 30-minute timeout with visual countdown |
| **File Safety** | Blocked extensions: `.exe .apk .bat .sh .msi .cmd .vbs .ps1 .jar .dmg` |
| **AI Safety** | Manual confirmation modal before any content is sent to Claude API |
| **Storage** | Zero server storage — history lives in browser memory only |
| **Secure Send** | Items marked as viewed, removed from feed, not recoverable |

> **Note:** Current peer transport uses `BroadcastChannel` (works across same-origin tabs). For production cross-device use, replace with a WebRTC signalling server + `RTCDataChannel`.

---

## 🤖 AI Smart Actions (Optional)

Each transfer card has an **AI** button that sends content to Claude for analysis.

### For Demo / Testing
The AI call goes directly to `api.anthropic.com`. You'll see a CORS error in production without a backend proxy.

### For Production (Secure)
Create `/api/analyze.js` (Vercel serverless function):

```js
// api/analyze.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(req.body),
  })
  const data = await response.json()
  res.status(response.status).json(data)
}
```

Then in `src/App.jsx`, find the AI fetch call and change:
```js
// FROM:
'https://api.anthropic.com/v1/messages'
// TO:
'/api/analyze'
```

Then add your key in Vercel dashboard → **Settings → Environment Variables**:
```
ANTHROPIC_API_KEY = sk-ant-...
```

---

## 🛠 Tech Stack

- **React 18** — UI library
- **Vite 5** — Build tool and dev server
- **WebCrypto API** — Native browser E2E encryption (no library needed)
- **BroadcastChannel API** — Cross-tab peer communication (demo mode)
- **CSS-in-JS** — Inline styles + injected `<style>` for responsive breakpoints
- **Google Fonts** — Per-theme font loading (Space Grotesk, Cormorant Garamond, Bebas Neue, DM Sans, Syne)

---

## 🗺 Roadmap

- [ ] WebRTC `RTCDataChannel` for true cross-device P2P
- [ ] Signalling server (WebSocket) for production pairing
- [ ] PWA / installable app with Service Worker
- [ ] TURN server fallback for NAT traversal
- [ ] Multi-file batch upload with ZIP compression
- [ ] Camera API for live QR scanning
- [ ] Transfer progress indicators for large files
- [ ] Native share sheet integration (mobile)

---

## 📄 License

MIT — free to use, modify, and deploy.

---

## 🙏 Credits

Built with [React](https://react.dev), [Vite](https://vitejs.dev), and [Claude](https://claude.ai).  
Fonts by [Google Fonts](https://fonts.google.com).  
Icons hand-crafted as inline SVG.
