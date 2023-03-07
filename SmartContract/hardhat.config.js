/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
module.exports = {
  defaultNetwork: "ganache",
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545",
    },

    ganache: {
      url: "HTTP://127.0.0.1:7545",
    },
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
