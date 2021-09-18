import { createContext, useContext, useReducer } from "react";

//* THIS IS THE DATA
export const StateContext = createContext();

//* BUILD A PROVIDER
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider
    value={useReducer(reducer, initialState)}
  >
    {children}
  </StateContext.Provider>
);

//* THIS IS HOW WE USE IT IN COMPONENT
export const useStateValue = () => useContext(StateContext);