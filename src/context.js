import React, { useState, useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
// const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const startingTotal = () => {
    let total = 0;
    cartItems.map((item) => {
      total += item.price * item.amount;
    });
    return total;
  };
  const startingAmount = () => {
    let total = 0;
    cartItems.map((item) => {
      total += item.amount;
    });
    return total;
  };

  const initialState = {
    cart: cartItems,
    total: startingTotal(),
    amount: startingAmount(),
    loading: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  // const [cart, setCart] = useState(cartItems);

  // const [total, setTotal] = useState();
  // const [totalAmount, setTotalAmount] = useState();

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
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
