import React, { useEffect, useState } from "react";


export default ({drizzle, drizzleState}) => {
  const [dataKey, setDataKey] = useState(null);
  
  useEffect(() => {
    const contract = drizzle.contracts.ComplexStorage;

    // get the value of string1 from the contract
    const dataKey = contract.methods["string2"].cacheCall();

    // Save the dataKey for later use
    setDataKey(dataKey);
    console.log(dataKey);
  }, []);

  // Get the contract state
  const ContractStore = drizzleState.contracts.ComplexStorage;
  console.log(ContractStore);

  // Use the saved 'dataKey' to get the 'group' variable
  const group = ContractStore.string2[dataKey];
  console.log(drizzle.web3);

  return (
    <div className="navbar">
      <div className="group">
        <h2>Group: {group && drizzle.web3.utils.toUtf8(group.value)}</h2>
      </div>
      <div className="selector">

      </div>
    </div>
  );
};