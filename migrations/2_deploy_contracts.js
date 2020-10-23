var MyToken = artifacts.require("./MyToken.sol");
var Sale = artifacts.require("./Sale.sol");
var myKyc = artifacts.require("./KycContract.sol");
require("dotenv").config({path: "../.env"});

console.log(process.env)
module.exports = async function(deployer) {
  let addr = await web3.eth.getAccounts();
  await deployer.deploy(MyToken,process.env.INITIAL_TOKEN);
  await deployer.deploy(myKyc);
  await deployer.deploy(Sale,1,addr[0],MyToken.address,myKyc.address);
  let instance = await MyToken.deployed();
  await instance.transfer(Sale.address, process.env.INITIAL_TOKEN);
};
