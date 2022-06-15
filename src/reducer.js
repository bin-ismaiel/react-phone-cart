import { useReducer } from "react";
import cartItems from "./data";

// function removeItem() {
//   setCart((prev) => {
//     let newCart =
//     return newCart;
//   });
//   setTotal((prev) => {
//     return prev - price * amount;
//   });
//   setTotalAmount((prev) => {
//     return prev - amount;
//   });
// }

// function increase() {
//   setCart((prev) => {
//     let target = prev.find((item) => {
//       return item.title === title;
//     });
//     target.amount = amount + 1;
//     return [...prev];
//   });
//   setTotal((prev) => {
//     return prev + price;
//   });
//   setTotalAmount((prev) => {
//     return prev + 1;
//   });
// }

// function decrease() {
//   setCart((prev) => {
//     let target = prev.find((item) => {
//       return item.title === title;
//     });
//     target.amount = amount - 1;
//     return [...prev];
//   });
//   setTotal((prev) => {
//     return prev - price;
//   });
//   setTotalAmount((prev) => {
//     return prev - 1;
//   });
// }
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

    default:
      console.log("error");
      return state;
  }
}

export default reducer;
