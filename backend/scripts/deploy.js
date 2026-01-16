const hre = require("hardhat");

async function main() {
  console.log("Deploying MicroPayment contract to Arc Testnet...");

  const MicroPayment = await hre.ethers.getContractFactory("MicroPayment");
  const microPayment = await MicroPayment.deploy();

  await microPayment.waitForDeployment();

  const address = await microPayment.getAddress();

  console.log("✅ MicroPayment contract deployed successfully!");
  console.log("📍 Contract Address:", address);
  console.log("🔍 View on Explorer: https://testnet.arcscan.app/address/" + address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
