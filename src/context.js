import React, { useState, useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const initialState = {
    cart: cartItems,
    total: 0,
    amount: 0,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  function clearCart() {
    dispatch({ type: "CLEAR" });
  }
  function remove(id) {
    dispatch({ type: "REMOVE", payload: id });
  }
  function increase(id) {
    dispatch({ type: "INCREASE", payload: id });
  }
  function decrease(id) {
    dispatch({ type: "DECREASE", payload: id });
  }

  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
  }, [state]);
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
