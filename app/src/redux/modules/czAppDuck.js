//      USED FROM DR.GERSCH"S ZOMBIE GAME
//
//      This is the REDUX "duck" format file.
//
//      This file contains all the constants, reducers, and action creators in one file
//      rather than spread them out among multiple directories and files.
//

// Action Types

// Types are listened for within the reducer switch whenever an action is fired off.
// The action is sent to the reducer with a type, and when that type matches the type within the a case of the switch,
// some sort of data manipulation is fired off.
//
// They are defined as all upper-case constants and may be exported if needed elsewhere.

const WEB3_INITIALIZED = "WEB3_INITIALIZED";
const BLOCKCHAIN_INITIALIZED = "BLOCKCHAIN_INITIALIZED";

//  Actions and Action Creator Functions
//
// Actions are simple javascript objects that at least contain a type, and may also contain data that can be sent to the reducer.
// When the user clicks on something that has an effect on the state of an app, an action creator sends an action to the reducer
// where the data manipulation happens.
//
// An action typically looks like this:   { type: ADD_ITEM, item: 'Adding this item' }
//
// Action creators are the functions that create actions and send them to the reducer.
// They usually return an action, sometimes can dispatch multiple actions (with the help of middleware like thunk),
// or can begin asynchronous events like API calls.

export function web3Initialized(results) {
  return {
    type: WEB3_INITIALIZED,
    payload: results
  };
}

export function blockchainInitialized(data) {
  return {
    type: BLOCKCHAIN_INITIALIZED,
    payload: data
  };
}

//
//  define the initial state for the store
//

const initialState = {
  web3Instance: null,
  CZ: {}, // contract instance with methods, etc.
  userAddress: "",
};

// Reducers
//
// The reducer is typically the only thing that touches the store.
// It only deals within a particular part of the store, initialized as initialState.
// It's a pure switch statement that does not directly change the state because state is immutable.
// That means you cannot use a method like .pop or .push that manipulates the array it's called on.
// Instead we create a now store from the old store and any information we want to put in to it.
// All reducers have a default case that just returns state.
//
// In this case, note that it is the default export.

export default function reducer(state = initialState, action) {
  console.log("reducer", action);
  switch (action.type) {

    case WEB3_INITIALIZED:
      console.log("Web3 is initializing", action.payload.results);
      return Object.assign({}, state, {
        web3Instance: action.payload.web3Instance
      });

    case BLOCKCHAIN_INITIALIZED:
      return Object.assign({}, state, {
        CZ: action.payload.CZ,
        userAddress: action.payload.userAddress,
      });

    default:
      return state;
  }
}
