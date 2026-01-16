# ⚡ Micro-Meter: Agentic Commerce on Arc

A decentralized Pay-Per-Inference Marketplace where AI Agents buy and sell intelligence using USDC.

## 💡 The Vision

In the coming Agent Economy, software will not use credit cards. Micro-Meter is an **"Economic OS" for AI**, allowing:

- **Specialist Agents** (e.g., Legal Analyzers, Security Auditors) to monetize their prompts
- **Consumer Agents** to pay for intelligence in real-time, per-request
- **Settlement on Arc**: Leveraging sub-second finality and USDC-as-Gas for frictionless machine-to-machine commerce

## 🏗️ Architecture

The system consists of three pillars:

### 1. The Economic Router (Smart Contract)
- Deployed on Arc Testnet
- Acts as an escrow that holds USDC and assigns unique Request IDs
- **Address**: `0xcC4BdC096505905bEF5B2bf7d9f79787F2058Be7`

### 2. The Provider Node (The Brain)
- A Python-based agent listening to the blockchain
- Upon detecting a payment event, it queries Google Gemini 2.5 Flash
- It signs a transaction to write the AI's response back to the blockchain, creating an **immutable proof of service**

### 3. The Client (UI)
- A Next.js dashboard ("Dark Mode/Terminal" aesthetic) for users to interact with the agent economy
- Real-time blockchain event monitoring
- Cyberpunk-inspired interface

## 🚀 Getting Started

### Quick Start (Recommended)

```bash
git clone https://github.com/mianohh/micro-meter-arc.git
cd micro-meter-arc

# Configure environment files (first time only)
# Edit backend/.env with your keys
# Edit frontend/.env.local with WalletConnect Project ID

# Start everything
./start
```

Visit `http://localhost:3000` to interact with the marketplace.

Press `Ctrl+C` to stop all services.

### Manual Setup

### 1. Clone & Setup

```bash
git clone https://github.com/mianohh/micro-meter-arc.git
cd micro-meter-arc
```

### 2. Backend (The Agent)

```bash
cd backend

# Install dependencies
npm install
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your GEMINI_API_KEY and PRIVATE_KEY

# Deploy contract (optional - already deployed)
npx hardhat run scripts/deploy.js --network arcTestnet

# Run the AI Provider Node
python provider_node.py
```

### 3. Frontend (The Dashboard)

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
# Add NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID to .env.local

# Run development server
npm run dev
```

Visit `http://localhost:3000` to interact with the marketplace.

## 🎯 Key Features

### ✅ Agentic Commerce
Fully autonomous economic loop: **Payment → Inference → Settlement**

### ✅ USDC Integration
USDC is used as the native unit of account and value transfer on Arc Testnet

### ✅ AI-Powered
Utilizes **Gemini 2.5 Flash** for high-speed, cost-effective reasoning

### ✅ On-Chain Proof
All AI responses are permanently stored on the blockchain with cryptographic verification

### ✅ Real-Time Updates
Live blockchain event monitoring with instant UI updates

## 📊 Technical Stack

**Blockchain:**
- Solidity 0.8.24
- Hardhat
- Arc Testnet (Chain ID: 5042002)

**Backend:**
- Python 3.x
- Web3.py
- Google Gemini AI

**Frontend:**
- Next.js 14
- TypeScript
- RainbowKit
- Wagmi
- Tailwind CSS

## 🔗 Live Demo

- **Contract**: [View on ArcScan](https://testnet.arcscan.app/address/0xcC4BdC096505905bEF5B2bf7d9f79787F2058Be7)
- **Frontend**: [Deploy to Vercel](https://vercel.com)

## 📝 How It Works

1. **User submits request** through the UI with 0.0001 USDC payment
2. **Smart contract** creates a unique Request ID and forwards payment to provider
3. **Provider node** detects the blockchain event
4. **AI processes** the request using Gemini 2.5 Flash
5. **Response is written** back to the blockchain
6. **User receives** the AI response with on-chain proof

## 🛡️ Security

- All transactions are cryptographically signed
- Responses are immutably stored on-chain
- Provider verification ensures only authorized agents can fulfill requests

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 🔗 Links

- [Arc Testnet Explorer](https://testnet.arcscan.app)
- [Documentation](./backend/README.md)
- [Frontend Setup](./frontend/README.md)

---

**Built with ❤️ for the Agent Economy**
