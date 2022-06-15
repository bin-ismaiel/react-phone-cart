import { useReducer } from "react";
import cartItems from "./data";

function reducer(state, action) {
  const { cart, total, amount } = state;

  switch (action.type) {
    case "CLEAR":
      console.log("cleared");
      return { ...state, cart: [] };

    case "INCREASE":
      console.log("increase");
      let increased = cart.map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
      return { ...state, cart: increased };

    case "DECREASE":
      console.log("decrease");
      let decreased = cart
        .map((item) => {
          if (item.id === action.payload) {
            return { ...item, amount: item.amount - 1 };
          }
          return item;
        })
        .filter((item) => item.amount !== 0);
      return { ...state, cart: decreased };

    case "REMOVE":
      return {
        ...state,
        cart: cart.filter((item) => item.id !== action.payload),
      };

    case "GET_TOTALS":
      const { total, amount } = cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          cartTotal.amount += amount;
          cartTotal.total += amount * price;
          return cartTotal;
        },
        { total: 0, amount: 0 }
      );
      return { ...state, total, amount };

    default:
      return state;
  }
}

export default reducer;
