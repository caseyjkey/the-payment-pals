import React from "react";
import { newContextComponents } from "@drizzle/react-components";

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props
  return (
    <div className="examples">
      <div className="section">
        <h2>Active Account</h2>
        <AccountData
          drizzle={drizzle}
          drizzleState={drizzleState}
          accountIndex={0}
          units="ether"
          precision={3}
        />
      </div>

      <div className="section">
        <h2>SimpleStorage</h2>
        <p>
          This shows a simple ContractData component with no arguments, along
          with a form to set its value.
        </p>
        <p>
          <strong>Stored Value: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="SimpleStorage"
            method="storedData"
          />
        </p>
        <ContractForm drizzle={drizzle} contract="SimpleStorage" method="set" />
      </div>

      <div className="section">
        <h2>ComplexStorage</h2>
        <p>
          Finally this contract shows data types with additional considerations.
          Note in the code the strings below are converted from bytes to UTF-8
          strings and the device data struct is iterated as a list.
        </p>
        <p>
          <strong>String 1: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="ComplexStorage"
            method="string1"
            toUtf8
          />
        </p>
        <p>
          <strong>String 2: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="ComplexStorage"
            method="string2"
            toUtf8
          />
        </p>
        <strong>Single Device Data: </strong>
        <ContractData
          drizzle={drizzle}
          drizzleState={drizzleState}
          contract="ComplexStorage"
          method="singleGroup"
        />
      </div>
    </div>
  );
};
