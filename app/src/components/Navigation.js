import React, { useEffect, useState, useContext } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Contract } from "web3-eth-contract";

export default () => {

  const drizzleContext = useContext(DrizzleContext.Context);
  const [groupsDataKey, setGroupsDataKey] = useState(null);
  const [groups, setGroups] = useState(null);
  const [nameDataKey, setNameDataKey] = useState(null);
  const [name, setName] = useState(null);
  const account = drizzleContext.drizzleState.accounts[0]; 

  const web3 = drizzleContext.drizzle.web3;

  useEffect(() => {
    if (drizzleContext.initialized) {
      const contract = drizzleContext.drizzle.contracts.PaymentHub;

      const groupsDataKey = contract.methods["userToGroups"].cacheCall(account, 0);
      setGroupsDataKey(groupsDataKey);
    
      const nameDataKey = contract.methods["userToMember"].cacheCall(account);
      setNameDataKey(nameDataKey);
    }
  }, [drizzleContext.initialized]);

  useEffect(() => {
    const ContractStore = drizzleContext.drizzleState.contracts.PaymentHub;

    // Use the saved 'dataKey' to get the return value from earlier.
    if (groupsDataKey) {
      setGroups(ContractStore.userToGroups[groupsDataKey].value);
    }
    if (nameDataKey && ContractStore.userToMember[nameDataKey]) {
      setName(ContractStore.userToMember[nameDataKey].value);
    }
  }, [drizzleContext.drizzleState]);

  
    return (
        <div className="header" >
            <h2>{name && name.name}'s Group: {groups && groups.name}</h2>
    </div>
  );
};