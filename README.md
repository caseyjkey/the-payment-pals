# The Payment Pals
This project is bootstrapped from the drizzle Truffle box, so it includes everything we need to start using smart countracts from a react app.
## Prerequisites
### Software Dependencies
* Node.js
Required to install packages such as Truffle and React.
* Truffle
Used for compiling and deploying contracts.

Check your versions using `truffle version`. This project was made using:
```
Truffle v5.1.10 (core: 5.1.10)
Solidity v0.5.16 (solc-js)
Node v10.16.3
Web3.js v1.2.1
```

### Shared Ethereum Wallet
For this project we will be testing on Rinkeby.
We load the secrets via files called `.mnemonic` and `.infura`. Contact Casey for these.


## Getting Started
0. Install node modules, i.e. OpenZeppelin
`npm install`
1. Run the development console
`truffle develop`
2. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
```
compile
migrate
```
3. In the `app` directory, we install the node modules, then  run the React app. Smart contract changes must be recompiled and migrated.
```
// in another terminal (i.e. not in the truffle development prompt)
cd app
npm install
npm run start
```
4. Truffle can run tests written in Solidity or JavaScript against your smart contracts. Note the command varies slightly if you're in or outside of the development console.
```
// inside the development console
test

// outside the development console
truffle test
```
7. Jest is included for testing React components. Compile your contracts before running Jest, or you may receive some file not found errors.
```
// ensure you are inside the app directory when running this
npm run test
```
8. To build the application for production, use the build script. A production build will be in the app/build folder.
```
// ensure you are inside the app directory when running this
npm run build
```

## Solidity `console.log` using Buidler
To have console.log, follow these steps:
1. From root directory, run `npx buidler node`
2. In seperate terminal, run `npx buidler run deploy.js --network localhost` to compile contracts, take note of the deployed contract address.
3. Copy the artifact `PaymentHub.json` from `/artifacts`to `/app/arc/contracts`
4. Append this `networks` key to the bottom of the artifact json object:
```
  "networks": {
    "31337": {
      "events": {},
      "links": {},
      "address": "0xa4bcDF64Cdd5451b6ac3743B414124A6299B65FF",
      "transactionHash": "0x320692bd72b17af0be036b5d59fe799be3a7ce336a1a2e3d3de72fa51db0d146"
    }
  }
  ```
  5. Run `npm run start` in `app` directory.
  
  The dApp will now be available and `console.log`s within PaymentHub will be visible in the console running the buidler node!


