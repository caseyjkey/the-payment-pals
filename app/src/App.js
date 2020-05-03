import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import PaymentPals from "./PaymentPals";
import "./App.css";
import WelcomeModal from "./components/Modal";

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
          } else {
            console.log(drizzle);
          }

          
          return (
              <div>
                  <PaymentPals drizzle={drizzle} drizzleState={drizzleState} />
                  <WelcomeModal drizzle={drizzle} drizzleState={drizzleState} />
            </div>
          )
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default App;
