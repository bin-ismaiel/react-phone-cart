import React, { useState, useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
// const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [cart, setCart] = useState(cartItems);

  const [total, setTotal] = useState(() => {
    let total = 0;
    cart.map((item) => {
      total += item.price * item.amount;
    });
    return total;
  });
  const [totalAmount, setTotalAmount] = useState(() => {
    let total = 0;
    cart.map((item) => {
      total += item.amount;
    });
    return total;
  });

  return (
    <AppContext.Provider
      value={{
        cart,
        setCart,
        total,
        setTotal,
        totalAmount,
        setTotalAmount,
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
