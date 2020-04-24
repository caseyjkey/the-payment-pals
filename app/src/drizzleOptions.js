import Web3 from "web3";
import SimpleStorage from "./contracts/SimpleStorage.json";
import PaymentHub from "./contracts/PaymentHub.json";

const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://localhost:8545"),
  },
  contracts: [SimpleStorage, PaymentHub],
  events: {
    SimpleStorage: ["StorageSet"],
  },
};

export default options;
