# Local OAuth - Web App

🔐 Revolutionary local OAuth system - Next.js web app with ED25519 signature verification.

## Overview

This is the **web application** part of the Local OAuth system. It runs on `localhost:3000` and communicates with the Electron OAuth agent running on `localhost:5000`.

## Features

- ✅ **ED25519 Signature Verification** - Cryptographically verify identity using @noble/ed25519
- ✅ **LocalStorage Sessions** - Persistent sessions across browser refreshes
- ✅ **Clean UI** - Built with Next.js 16, React 19, and Tailwind CSS
- ✅ **Dark Mode Support** - HSL color variables for seamless theme switching
- ✅ **Error Handling** - Clear error messages for connection and verification failures

## Prerequisites

1. **Node.js** 20+ installed
2. **Local OAuth Electron Agent** running on port 5000

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The app will be available at `http://localhost:3000`

## How It Works

### 1. User clicks "Continue with Local Identity"

The web app sends a POST request to the Electron OAuth agent:

```typescript
fetch('http://localhost:5000/oauth', {
  method: 'POST',
  body: JSON.stringify({ nonce: crypto.randomUUID() })
})
```

### 2. Electron agent shows system alert

The Electron app displays a native OS dialog asking for name and email.

### 3. Electron signs and returns data

Electron responds with:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "publicKey": "base64...",
  "timestamp": "2025-01-15T10:30:00Z",
  "signature": "base64...",
  "nonce": "uuid..."
}
```

### 4. Web app verifies signature

Using `@noble/ed25519`, the web app:
- Reconstructs the signed message
- Verifies the signature with the public key
- Creates a session if valid

### 5. Session stored in localStorage

User stays logged in across refreshes until they click logout.

## Tech Stack

- **Next.js** 16.0.3 - React framework with App Router
- **React** 19.2.0 - UI library
- **TypeScript** ^5 - Type safety
- **@noble/ed25519** ^2.3.0 - ED25519 signature verification (matching ghostmrr)
- **Tailwind CSS** ^3.4.18 - Styling with HSL CSS variables
- **lucide-react** ^0.554.0 - UI icons

## Project Structure

```
local-oauth-web-app/
├── app/
│   ├── lib/
│   │   ├── crypto.ts          # ED25519 signature verification
│   │   ├── auth.ts            # localStorage session management
│   │   └── types.ts           # TypeScript types
│   ├── globals.css            # Tailwind + CSS variables
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Login/Dashboard page
├── components/
│   ├── LoginButton.tsx        # OAuth login button
│   └── Dashboard.tsx          # Logged-in user dashboard
└── package.json
```

## Verification Pattern

Follows the same cryptographic verification pattern as [ghostmrr](https://github.com/filiksyos/ghostmrr):

```typescript
// Reconstruct message
const message = JSON.stringify({
  name: response.name,
  email: response.email,
  timestamp: response.timestamp,
  nonce: response.nonce,
});

// Verify with @noble/ed25519
const isValid = await ed.verifyAsync(signature, messageBytes, publicKey);
```

## Error Handling

- **Electron not running**: "Cannot connect to Local OAuth Agent. Please ensure the Electron app is running on port 5000."
- **Invalid signature**: "Invalid signature - verification failed"
- **Network errors**: Clear error messages displayed in UI

## Development

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start
```

## Related

- [Local OAuth Electron Agent](https://github.com/filiksyos/local-oauth-electron-agent) - Companion Electron app
- [GhostMRR](https://github.com/filiksyos/ghostmrr) - Inspiration for ED25519 verification

## License

MIT

---

**Built with ❤️ using GitMVP**
