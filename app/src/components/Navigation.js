import React, { useEffect, useState, useContext } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Contract } from "web3-eth-contract";

export default () => {

  const drizzleContext = useContext(DrizzleContext.Context);
  const [dataKey, setDataKey] = useState(null);
  const [groups, setGroups] = useState(null);
  const account = drizzleContext.drizzleState.accounts[0]; 

  const web3 = drizzleContext.drizzle.web3;

  useEffect(() => {
    if (drizzleContext.initialized) {
      const contract = drizzleContext.drizzle.contracts.ComplexStorage;
      const dataKey = contract.methods["userToGroups"].cacheCall(account, 0);
      setDataKey(dataKey);
      console.log(dataKey);
    }
  }, [drizzleContext.initialized]);

  useEffect(() => {
    if (dataKey) {
      const ContractStore = drizzleContext.drizzleState.contracts.ComplexStorage;
      // Use the saved 'dataKey' to get the return value from earlier.
      setGroups(ContractStore.userToGroups[dataKey].value)
    }
  }, [drizzleContext.drizzleState]);

  
  return (
    <div className="navbar">
        <h2>{account}'s Group: {groups && groups.name}</h2>
    </div>
  );
};