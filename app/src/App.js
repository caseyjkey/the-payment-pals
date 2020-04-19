import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";

import MyComponent from "./MyComponent"
import PaymentPal from "./PaymentPal";

import { Container } from "semantic-ui-react";
import { Provider } from "react-redux";
import { HashRouter, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import store from "./redux/store";

import "./App.css";

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
                <Provider store={store}>
                    <HashRouter>
                        <Container>
                            <div>
                                <Route exact path="/" component={PaymentPal} />
                            </div>
                            <NavBar drizzle={drizzle} drizzleState={drizzleState} />
                            <MyComponent drizzle={drizzle} drizzleState={drizzleState} />
                        </Container>
                    </HashRouter>
                </Provider>
          )
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default App;
