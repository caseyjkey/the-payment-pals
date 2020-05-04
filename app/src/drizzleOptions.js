import Web3 from "web3";
import PaymentHub from "./contracts/PaymentHub.json";

const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://localhost:8545"),
  },
  contracts: [PaymentHub],
  events: {},
};

export default options;
