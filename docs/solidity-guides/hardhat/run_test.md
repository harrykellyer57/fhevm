import { task } from "hardhat/config";
import "@fhevm/hardhat-plugin";

task("decrypt-count", "Decrypt current counter value").setAction(async (_, hre) => {
  const count = await hre.fhevm.decryptCount();
  console.log("Decrypted count:", count.toString());
});

task("increment", "Increment counter")
  .addParam("value", "Value to increment by")
  .setAction(async ({ value }, hre) => {
    const tx = await hre.fhevm.incrementCounter(value);
    await tx.wait();
    console.log(`Counter incremented by ${value}`);
  });

export default {
  solidity: "0.8.19",
  networks: {
    hardhat: {},
    localhost: { url: "http://127.0.0.1:8545" },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
  },
};
