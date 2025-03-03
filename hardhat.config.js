require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/0x$5_LUuOd0pnWoXydqxfZ9zfY6M_esK9o_",
      accounts: [`0x$5_LUuOd0pnWoXydqxfZ9zfY6M_esK9o_}`],
    },
  },
};
