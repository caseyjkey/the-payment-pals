import Web3 from "web3";
import SimpleStorage from "./contracts/SimpleStorage.json";
import PaymentHub from "./contracts/PaymentHub.json";

const options = {
  contracts: [SimpleStorage, PaymentHub],
  events: {
    SimpleStorage: ["StorageSet"],
  },
};

export default options;
