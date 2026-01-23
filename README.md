# ⚡ Micro-Meter: Decentralized AI Agent Marketplace

**The first Pay-Per-Inference AI marketplace on Arc Testnet - Democratizing AI access through blockchain micropayments.**

## 🎯 Problem & Solution

**Problem**: AI services are expensive, centralized, and lack transparency in pricing and quality.

**Solution**: Micro-Meter creates a decentralized marketplace where:
- Users pay only 0.0001 USDC per AI inference
- All transactions are transparent and on-chain
- AI providers compete on quality and price
- No subscriptions or minimum commitments

## 🏗️ Architecture Overview

```
User Request → Smart Contract → AI Provider → On-Chain Response
     ↓              ↓              ↓              ↓
  0.0001 USDC → Escrow Payment → Service → Permanent Storage
```

### Core Components:
- **Frontend**: Next.js 14 with RainbowKit wallet integration
- **Smart Contract**: Solidity contract managing payments and requests
- **AI Provider**: Python node processing requests with Gemini API
- **Blockchain**: Arc Testnet for fast, cheap transactions

## 🚀 Live Demo

**Contract Address**: `0xcC4BdC096505905bEF5B2bf7d9f79787F2058Be7`  
**Network**: Arc Testnet (Chain ID: 5042002)  
**Explorer**: [View on ArcScan](https://testnet.arcscan.app/address/0xcC4BdC096505905bEF5B2bf7d9f79787F2058Be7)

## 💡 Innovation Highlights

### 1. **Micropayment Economy**
- Sub-cent pricing (0.0001 USDC) makes AI accessible globally
- No minimum balance or subscription required
- Instant settlement on Arc blockchain

### 2. **Transparent AI Marketplace**
- All requests and responses stored on-chain
- Verifiable AI service quality
- Open competition between providers

### 3. **Developer-Friendly**
- Simple integration with existing dApps
- RESTful API for traditional apps
- Lightweight frontend (2MB bundle)

## 🛠️ Quick Start

### For Users:
```bash
git clone https://github.com/mianohh/micro-meter-arc.git
cd micro-meter-arc
./start
```

### For Developers:
```bash
# Frontend only
cd frontend && npm install && npm run dev

# Full stack with AI provider
cd backend && pip install -r requirements.txt
python provider_node.py
```

## 📊 Technical Specifications

| Component | Technology | Purpose |
|-----------|------------|---------|
| Frontend | Next.js 14, TypeScript | User interface |
| Wallet | RainbowKit, Wagmi | Blockchain connection |
| Smart Contract | Solidity | Payment & request management |
| AI Provider | Python, Gemini API | Request processing |
| Blockchain | Arc Testnet | Transaction settlement |

## 🎮 How It Works

1. **Connect Wallet**: Users connect to Arc Testnet
2. **Submit Request**: Enter AI prompt and pay 0.0001 USDC
3. **On-Chain Payment**: Smart contract escrows payment
4. **AI Processing**: Provider node processes request
5. **Response Storage**: Answer stored permanently on-chain
6. **Payment Release**: Provider receives payment automatically

## 🔧 Configuration

### Environment Setup:
```bash
# Frontend (.env.local)
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id

# Backend (.env)
PRIVATE_KEY=your_wallet_private_key
GEMINI_API_KEY=your_gemini_api_key
PROVIDER_ADDRESS=your_provider_wallet_address
```

## 🌟 Business Model

### For Users:
- Pay-per-use pricing
- No subscriptions
- Global accessibility
- Transparent costs

### For AI Providers:
- Earn per inference
- Compete on quality
- Automated payments
- Global market access

### For Developers:
- Easy integration
- Blockchain-verified responses
- Micropayment infrastructure
- Open-source foundation

## 🚀 Future Roadmap

- [ ] Multi-model support (GPT, Claude, Llama)
- [ ] Reputation system for providers
- [ ] Bulk request discounts
- [ ] Cross-chain deployment
- [ ] Mobile app
- [ ] API marketplace

## 📈 Market Opportunity

- **AI Market**: $150B+ by 2025
- **Micropayments**: Underserved in AI space
- **Global Access**: Billions without AI access
- **Developer Tools**: Growing demand for AI APIs

## 🏆 Why Micro-Meter Wins

1. **First Mover**: First AI marketplace on Arc
2. **Real Utility**: Solves actual pricing problems
3. **Technical Excellence**: Clean, scalable architecture
4. **User Experience**: Simple, fast, reliable
5. **Economic Model**: Sustainable for all parties

## 🔗 Links

- **Live Demo**: [Deploy on Vercel](https://vercel.com/new/clone?repository-url=https://github.com/mianohh/micro-meter-arc)
- **Smart Contract**: `0xcC4BdC096505905bEF5B2bf7d9f79787F2058Be7`
- **Arc Testnet**: [Get USDC](https://faucet.arc.xyz)
- **Documentation**: See `/backend/README.md` for provider setup

---

**Built for the Agent Economy • Powered by Arc Testnet • Ready for Production**

*Democratizing AI access, one inference at a time.*