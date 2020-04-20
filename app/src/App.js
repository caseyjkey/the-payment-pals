import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import PaymentPals from "./PaymentPals";
import MyComponent from "./MyComponent"
import "./App.css";

// For info on how drizzle works including drizzleContext
// visit https://www.npmjs.com/package/@umaprotocol/react-plugin
const drizzle = new Drizzle(drizzleOptions);

const App = () => {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) {
            return "Loading..."
          }

            return (
              <div>
                <PaymentPals drizzle={drizzle} drizzleState={drizzleState} />
                <MyComponent drizzle={drizzle} drizzleState={drizzleState} />
              </div>
          )
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default App;
