import os
import json
from web3 import Web3
from dotenv import load_dotenv

load_dotenv()

RPC_URL = os.getenv("RPC_URL", "https://rpc-testnet.arc.network")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
CONTRACT_ADDRESS = "0xcC4BdC096505905bEF5B2bf7d9f79787F2058Be7"

w3 = Web3(Web3.HTTPProvider(RPC_URL))

account = w3.eth.account.from_key(PRIVATE_KEY)
user_address = account.address

with open("artifacts/contracts/MicroPayment.sol/MicroPayment.json", "r") as f:
    contract_data = json.load(f)
    abi = contract_data["abi"]

contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=abi)

print(f"🧪 Test Payment Script")
print(f"👤 Sender: {user_address}")
print(f"💳 Paying to: {user_address} (self-pay test)")
print(f"💰 Amount: 0.0001 USDC\n")

amount_wei = int(0.0001 * 1e6)

tx = contract.functions.payForService(
    user_address,
    "test-service-01",
    "Explain the philosophy of Stoicism in one sentence."
).build_transaction({
    'from': user_address,
    'value': amount_wei,
    'nonce': w3.eth.get_transaction_count(user_address),
    'gas': 200000,
    'gasPrice': w3.eth.gas_price
})

signed_tx = w3.eth.account.sign_transaction(tx, PRIVATE_KEY)
tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)

print(f"📤 Transaction sent: {tx_hash.hex()}")
print(f"⏳ Waiting for confirmation...")

receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

print(f"✅ Transaction confirmed in block {receipt['blockNumber']}")
print(f"🔍 View on Explorer: https://testnet.arcscan.app/tx/{tx_hash.hex()}")
print(f"\n💡 Now check your provider_node.py output to see the AI response!")
