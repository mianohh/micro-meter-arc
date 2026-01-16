# Backend - Micro-Meter

The backend consists of smart contracts and the AI provider node.

## Structure

```
backend/
├── contracts/              # Solidity smart contracts
│   └── MicroPayment.sol   # Main payment router
├── scripts/               # Deployment scripts
│   └── deploy.js         # Contract deployment
├── provider_node.py      # AI agent listener
├── test_payment.py       # Testing script
├── hardhat.config.js     # Hardhat configuration
├── package.json          # Node.js dependencies
└── requirements.txt      # Python dependencies
```

## Setup

### 1. Install Dependencies

```bash
# Node.js dependencies
npm install

# Python dependencies
pip install -r requirements.txt
```

### 2. Configure Environment

Create a `.env` file:

```env
PRIVATE_KEY=your_wallet_private_key
RPC_URL=https://5042002.rpc.thirdweb.com
GEMINI_API_KEY=your_gemini_api_key
PROVIDER_ADDRESS=your_provider_wallet_address
```

### 3. Deploy Contract (Optional)

```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network arcTestnet
```

### 4. Run Provider Node

```bash
python provider_node.py
```

## Contract Details

- **Address**: `0xcC4BdC096505905bEF5B2bf7d9f79787F2058Be7`
- **Network**: Arc Testnet (Chain ID: 5042002)
- **Explorer**: https://testnet.arcscan.app

## Testing

```bash
python test_payment.py
```

## How It Works

1. Provider node listens for `ServicePurchased` events
2. When detected, extracts the request prompt
3. Sends prompt to Google Gemini AI
4. Signs and submits fulfillment transaction with AI response
5. Response is stored on-chain permanently
