import { useReducer } from "react";
import cartItems from "../data";
import React from "react";
const CartContext = React.createContext({
  items: [],
  totalPrice: 0,
  totalItems: 0,
  clearCart: () => {},
  increase: () => {},
  decrease: () => {},
  removeItem: () => {},
});

const INIT_CART = [...cartItems];

const cartReducer = (prevState, action) => {
  const updateState = (updatedItems) => {
    return {
      items: [...updatedItems],
      totalItems: getTotalItems(updatedItems),
      totalPrice: getTotalPrice(updatedItems),
    };
  };

  let updatedItems = [];

  switch (action.type) {
    case "CLEAR":
      return { ...prevState, items: [] };

    case "INCREASE":
      updatedItems = prevState.items.map((item) => {
        if (item.id === action.id) {
          return { ...item, amount: item.amount + 1 };
        } else {
          return item;
        }
      });
      return updateState(updatedItems);

    case "DECREASE":
      updatedItems = prevState.items.map((item) => {
        if (item.id === action.id) {
          return { ...item, amount: item.amount - 1 };
        } else {
          return item;
        }
      });

      return updateState(updatedItems);

    case "REMOVE":
      updatedItems = prevState.items.filter((item) => {
        return item.id !== action.id;
      });

      return updateState(updatedItems);
  }
};

const getTotalItems = (arr) => {
  let totalItems = 0;
  totalItems = arr.reduce((acc, current) => {
    return acc + current.amount;
  }, 0);
  return totalItems;
};
const getTotalPrice = (arr) => {
  let totalPrice = 0;
  totalPrice = arr.reduce((acc, current) => {
    return acc + +current.price * current.amount;
  }, 0);
  return Math.round(totalPrice);
};

export const CartContextProvider = (props) => {
  const [cart, dispatch] = useReducer(cartReducer, {
    items: INIT_CART,
    totalPrice: getTotalPrice(INIT_CART),
    totalItems: getTotalItems(INIT_CART),
  });

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };
  const increase = (id) => {
    dispatch({ type: "INCREASE", id: id });
  };
  const decrease = (id) => {
    dispatch({ type: "DECREASE", id: id });
  };
  const removeItem = (id) => {
    dispatch({ type: "REMOVE", id: id });
  };

  return (
    <CartContext.Provider
      value={{ ...cart, clearCart, increase, decrease, removeItem }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
