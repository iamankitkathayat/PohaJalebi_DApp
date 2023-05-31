const hre = require("hardhat");

async function main() {

  const PohaJalebi = await hre.ethers.getContractFactory("PohaJalebi");
  const pohaJalebi = await PohaJalebi.deploy();

  await pohaJalebi.deployed();

  console.log("PohaJalebi deployed at :",`${pohaJalebi.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
