const SimpleStorage = artifacts.require("SimpleStorage");
const TutorialToken = artifacts.require("TutorialToken");
const ComplexStorage = artifacts.require("ComplexStorage");
const PaymentHub = artifacts.require("PaymentHub");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(PaymentHub);
};
