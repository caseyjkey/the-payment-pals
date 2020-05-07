import Web3 from "web3";
import PaymentHub from "./contracts/PaymentHub.json";

const options = {
  contracts: [PaymentHub],
  events: {},
};

export default options;
