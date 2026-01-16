export const CONTRACT_ADDRESS = '0xcC4BdC096505905bEF5B2bf7d9f79787F2058Be7' as const;

export const CONTRACT_ABI = [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "requestId", "type": "uint256" },
      { "indexed": false, "internalType": "string", "name": "outputData", "type": "string" }
    ],
    "name": "RequestFulfilled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "requestId", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "payer", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "provider", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "indexed": false, "internalType": "string", "name": "inputData", "type": "string" }
    ],
    "name": "ServicePurchased",
    "type": "event"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_requestId", "type": "uint256" },
      { "internalType": "string", "name": "_outputData", "type": "string" }
    ],
    "name": "fulfillRequest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextRequestId",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_provider", "type": "address" },
      { "internalType": "string", "name": "_serviceId", "type": "string" },
      { "internalType": "string", "name": "_inputData", "type": "string" }
    ],
    "name": "payForService",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "requests",
    "outputs": [
      { "internalType": "address", "name": "payer", "type": "address" },
      { "internalType": "address", "name": "provider", "type": "address" },
      { "internalType": "string", "name": "inputData", "type": "string" },
      { "internalType": "string", "name": "outputData", "type": "string" },
      { "internalType": "bool", "name": "isFulfilled", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const PROVIDER_ADDRESS = '0xd7982FD2346F3ff548C38562f7981cF8c298452A' as const;
