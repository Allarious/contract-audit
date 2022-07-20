import { HardhatUserConfig, task } from "hardhat/config";
import { nodeAPIKey } from "./config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.1"
      },
      {
        version: "0.6.1"
      }
    ]
  },
  // networks:{
  //   hardhat:{
  //     forking:{
  //       url: nodeAPIKey
  //     }
  //   }
  // }
};

task("balance", "Prints the balance of an address")
  .addParam("account", "Address of the account")
  .setAction(async (taskArgs, hre) => {
    const address = taskArgs.account;
    const balance = await hre.ethers.provider.getBalance(address);
    console.log(hre.ethers.utils.formatEther(balance), "ETH")
  })

export default config;
