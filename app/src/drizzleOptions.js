import Web3 from "web3";
import SimpleStorage from "./contracts/SimpleStorage.json";
import PaymentHub from "./contracts/PaymentHub.json";

const options = {
  web3: {
    customProvider: new Web3("wss://rinkeby.infura.io/ws/v3/32dab0fd4be0440284d38147e8f5330c"),
  },
  contracts: [SimpleStorage, PaymentHub],
  events: {
    SimpleStorage: ["StorageSet"],
  },
};

export default options;
