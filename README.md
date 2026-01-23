# ⚡ Micro-Meter-Arc: Decentralized AI Agent Marketplace

**The first Pay-Per-Inference AI marketplace on Arc Testnet - Democratizing AI access through blockchain micropayments.**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mianohh/micro-meter-arc)

## 🎯 Problem & Solution

**Problem**: AI services are expensive, centralized, and lack transparency in pricing and quality.

**Solution**: Micro-Meter-Arc creates a decentralized marketplace where:
- Users pay only **0.0001 USDC** per AI inference
- All transactions are transparent and on-chain
- Real-time AI responses powered by **Gemini AI**
- No subscriptions or minimum commitments

## 🏗️ Architecture Overview

```
User Request → Wallet Connection → USDC Payment → Gemini AI → Response
     ↓              ↓                ↓            ↓          ↓
Connect Wallet → Smart Contract → Escrow → Processing → On-Chain Storage
```

### Core Components:
- **Frontend**: Next.js 14 with RainbowKit wallet integration
- **Smart Contract**: Solidity contract managing payments and requests
- **AI Integration**: Real Gemini AI API with multiple model fallbacks
- **Blockchain**: Arc Testnet for fast, cheap transactions

## 🚀 Live Demo

**Contract Address**: `0xcC4BdC096505905bEF5B2bf7d9f79787F2058Be7`  
**Network**: Arc Testnet (Chain ID: 5042002)  
**Explorer**: [View on ArcScan](https://testnet.arcscan.app/address/0xcC4BdC096505905bEF5B2bf7d9f79787F2058Be7)

## 💡 Innovation Highlights

### 1. **Real AI Integration**
- Powered by Google Gemini AI
- Multiple model fallbacks for reliability
- Real-time responses to user queries

### 2. **Micropayment Economy**
- Sub-cent pricing (0.0001 USDC) makes AI accessible globally
- Wallet connection required for payments
- Instant settlement on Arc blockchain

### 3. **Production Ready**
- Clean, secure codebase
- Environment variable protection
- Vercel deployment optimized

## 🛠️ Quick Start

### Prerequisites
- Node.js 18+
- Arc Testnet wallet with USDC
- Gemini API key
- WalletConnect Project ID

### Local Development
```bash
git clone https://github.com/mianohh/micro-meter-arc.git
cd micro-meter-arc/frontend
npm install
npm run dev
```

### Environment Setup
Create `frontend/.env.local`:
```bash
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
GEMINI_API_KEY=your_gemini_api_key
```

## 📊 Technical Specifications

| Component | Technology | Purpose |
|-----------|------------|---------|
| Frontend | Next.js 14, TypeScript | User interface |
| Wallet | RainbowKit, Wagmi | Blockchain connection |
| AI | Google Gemini API | Real AI responses |
| Smart Contract | Solidity | Payment management |
| Blockchain | Arc Testnet | Transaction settlement |

## 🎮 How It Works

1. **Connect Wallet**: Users connect to Arc Testnet
2. **Enter Request**: Type AI query in the interface
3. **Pay USDC**: 0.0001 USDC payment via smart contract
4. **AI Processing**: Real Gemini AI processes the request
5. **Get Response**: Receive detailed AI response
6. **On-Chain Record**: Transaction stored permanently

## 🔧 Deployment

### Vercel Deployment
1. Fork this repository
2. Connect to Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`
   - `GEMINI_API_KEY`
4. Deploy automatically

### Environment Variables
```bash
# Required for wallet connection
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id

# Required for AI functionality  
GEMINI_API_KEY=your_gemini_api_key
```

## 🌟 Features

### For Users:
- **Real AI Responses**: Powered by Google Gemini
- **Wallet Integration**: Connect with any Web3 wallet
- **Transparent Pricing**: 0.0001 USDC per request
- **Instant Results**: Fast AI processing and responses

### For Developers:
- **Clean Architecture**: Well-structured, maintainable code
- **Security First**: No hardcoded secrets or keys
- **Easy Integration**: Simple API and smart contract interface
- **Production Ready**: Optimized for deployment

## 🚀 Future Roadmap

- [ ] Multi-model AI support (GPT, Claude, Llama)
- [ ] Reputation system for AI providers
- [ ] Bulk request discounts
- [ ] Cross-chain deployment
- [ ] Mobile app
- [ ] Advanced AI agent marketplace

## 📈 Market Opportunity

- **AI Market**: $150B+ by 2025
- **Micropayments**: Underserved in AI space
- **Global Access**: Billions without affordable AI access
- **Developer Tools**: Growing demand for AI APIs

## 🏆 Why Micro-Meter-Arc Wins

1. **Real Utility**: Actual AI responses, not demos
2. **Production Ready**: Clean, secure, deployable code
3. **User Experience**: Simple wallet connection + payment flow
4. **Technical Excellence**: Modern stack with best practices
5. **Economic Model**: Sustainable micropayment system

## 🔗 Links

- **Live Demo**: Deploy on Vercel with one click
- **Smart Contract**: `0xcC4BdC096505905bEF5B2bf7d9f79787F2058Be7`
- **Arc Testnet**: [Get USDC](https://faucet.arc.xyz)
- **Gemini API**: [Get API Key](https://aistudio.google.com/app/apikey)

## 📝 License

MIT License - see LICENSE file for details

---

**Built for the Agent Economy • Powered by Arc Testnet & Gemini AI • Ready for Production**

*Democratizing AI access, one inference at a time.*