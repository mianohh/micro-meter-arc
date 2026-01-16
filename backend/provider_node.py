import os
import time
import json
from web3 import Web3
from dotenv import load_dotenv
from google import genai

load_dotenv()

GENAI_KEY = os.getenv("GEMINI_API_KEY")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
RPC_URL = os.getenv("RPC_URL", "https://5042002.rpc.thirdweb.com")
CONTRACT_ADDRESS = "0xcC4BdC096505905bEF5B2bf7d9f79787F2058Be7"

client = genai.Client(api_key=GENAI_KEY)
web3 = Web3(Web3.HTTPProvider(RPC_URL))

if not PRIVATE_KEY:
    print("❌ Error: PRIVATE_KEY not found in .env")
    exit()

account = web3.eth.account.from_key(PRIVATE_KEY)
my_address = account.address

print(f"🚀 Agent Active: {my_address}")
print(f"📡 Target Contract: {CONTRACT_ADDRESS}")

ABI_PATH = "artifacts/contracts/MicroPayment.sol/MicroPayment.json"
try:
    with open(ABI_PATH, "r") as f:
        contract_abi = json.load(f)["abi"]
except FileNotFoundError:
    print("❌ Run 'npx hardhat compile' first")
    exit()

contract = web3.eth.contract(address=CONTRACT_ADDRESS, abi=contract_abi)

def submit_fulfillment(request_id, answer):
    print(f"💾 Submitting answer to Chain (Req: {request_id})...")
    try:
        tx = contract.functions.fulfillRequest(request_id, answer).build_transaction({
            'from': my_address,
            'nonce': web3.eth.get_transaction_count(my_address),
            'gas': 2000000,
            'gasPrice': web3.eth.gas_price
        })
        
        signed_tx = web3.eth.account.sign_transaction(tx, PRIVATE_KEY)
        tx_hash = web3.eth.send_raw_transaction(signed_tx.rawTransaction)
        
        print(f"✅ Answer Mined! Tx: {web3.to_hex(tx_hash)}")
        print(f"🔗 View: https://testnet.arcscan.app/tx/{web3.to_hex(tx_hash)}")
    except Exception as e:
        print(f"❌ Transaction Failed: {e}")

print("⏳ Waiting for requests...")
last_block = web3.eth.block_number
processed_requests = set()

while True:
    try:
        current_block = web3.eth.block_number
        
        if current_block > last_block:
            events = contract.events.ServicePurchased.get_logs(
                fromBlock=last_block + 1,
                toBlock=current_block
            )
            
            for event in events:
                req_id = event['args']['requestId']
                
                if req_id in processed_requests:
                    continue
                
                processed_requests.add(req_id)
                
                payer = event['args']['payer']
                provider = event['args']['provider']
                prompt = event['args']['inputData']
                
                if provider.lower() == my_address.lower():
                    print("------------------------------------------------")
                    print(f"🔔 Request #{req_id} received from {payer}")
                    print(f"📝 Prompt: {prompt}")
                    
                    try:
                        print("🤖 AI Thinking...")
                        response = client.models.generate_content(
                            model='gemini-2.5-flash',
                            contents=prompt
                        )
                        answer = response.text[:500]
                        
                        print(f"💡 Generated: {answer[:50]}...")
                        submit_fulfillment(req_id, answer)
                    except Exception as e:
                        print(f"❌ Processing Error: {e}")
            
            last_block = current_block
        
        time.sleep(2)
    except Exception as e:
        print(f"⚠️ Loop Error: {e}")
        time.sleep(2)
