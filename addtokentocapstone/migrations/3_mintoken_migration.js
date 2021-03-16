const Token = artifacts.require("SmolToken");
const TokenA = artifacts.require("ABCToken");

module.exports = async function (deployer) {
  const accounts = await web3.eth.getAccounts()
  await deployer.deploy(Token)
  await deployer.deploy(TokenA)
};
