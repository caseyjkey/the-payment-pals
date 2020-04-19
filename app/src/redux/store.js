//      USED FROM DR.GERSCH"S ZOMBIE GAME

import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import reducer from "./modules/czAppDuck";

const loggerMiddleware = createLogger(); // initialize logger

const store = createStore(reducer, applyMiddleware(thunkMiddleware,loggerMiddleware));
export default store;