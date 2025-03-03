const hre = require("hardhat");

async function main() {
  const IdentityContract = await hre.ethers.getContractFactory("IdentityContract");
  const identity = await IdentityContract.deploy();
  await identity.deployed();

  console.log("IdentityContract deployed to:", identity.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
