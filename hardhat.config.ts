import { HardhatUserConfig } from "hardhat/config";
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
  networks:{
    hardhat:{
      forking:{
        url: nodeAPIKey
      }
    }
  }
};

export default config;
