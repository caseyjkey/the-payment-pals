import React, { useEffect, useState } from "react";

export default ({drizzle, drizzleState}) => {
  const [dataKey, setDataKey] = useState(null);
  
  useEffect(() => {
    const contract = drizzle.contracts.ComplexStorage;

    // get the value of string1 from the contract
    const dataKey = contract.methods["userToGroup"].cacheCall();

    // Save the dataKey for later use
    setDataKey(dataKey);
  }, [drizzle.contracts.ComplexStorage]);

  // Get the contract state
  const ContractStore = drizzleState.contracts.ComplexStorage;

  // Use the saved 'dataKey' to get the 'group' variable
  const userToGroup = ContractStore.userToGroup[dataKey];

  // Get currentaccount
  const account = drizzleState.accounts[0];

  const group = userToGroup(account);

  return (
    <div className="navbar">
      <div className="group">
        <h2>{account}'s Group: {group && drizzle.web3.utils.toUtf8(group.value)}</h2>
      </div>
      <div className="selector">

      </div>
    </div>
  );
};