import React, { createContext, useContext, useReducer } from "react";

// PREPARES DATA LAYER
export const StateContext = createContext();

// WRAP APP AND PROVIDE THE DATA LAYER
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// PULL INFORMATION FROM DATA LAYER
export const useStateValue = () => useContext(StateContext);
