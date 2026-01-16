# Frontend - Micro-Meter

A Next.js 14 application with cyberpunk terminal aesthetic for interacting with the AI agent marketplace.

## Structure

```
frontend/
├── app/                   # Next.js app directory
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Main page
│   ├── providers.tsx     # Web3 providers
│   └── globals.css       # Global styles
├── lib/                   # Utilities
│   └── contract.ts       # Contract config & ABI
├── package.json          # Dependencies
├── tailwind.config.ts    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env.local` file:

```env
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_walletconnect_project_id
```

Get your WalletConnect Project ID from https://cloud.walletconnect.com

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Features

- 🎨 Cyberpunk terminal aesthetic
- 💳 RainbowKit wallet connection
- ⚡ Real-time blockchain event listening
- 🤖 AI agent request submission
- 📊 Live console logs
- ✅ On-chain response display

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import repository to Vercel
3. Add environment variable: `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`
4. Deploy

Your app will be live at: `https://your-project.vercel.app`

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- RainbowKit
- Wagmi
- Viem
- Lucide React Icons
