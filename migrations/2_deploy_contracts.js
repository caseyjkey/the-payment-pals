const SimpleStorage = artifacts.require("SimpleStorage");
const PaymentHub = artifacts.require("PaymentHub");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(PaymentHub);
};
