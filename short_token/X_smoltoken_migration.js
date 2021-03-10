const Token = artifacts.require("SmolToken");

module.exports = async function (deployer) {
  const accounts = await web3.eth.getAccounts()
  await deployer.deploy(Token)
};
