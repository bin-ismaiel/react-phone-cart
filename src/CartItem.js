import React, { useState } from "react";
import { useGlobalContext } from "./context";
const CartItem = ({ id, img, title, price, amount }) => {
  const { setTotal, setCart, setTotalAmount } = useGlobalContext();
  if (amount === 0) {
    removeItem();
  }

  function removeItem() {
    setCart((prev) => {
      let newCart = prev.filter((item) => {
        return item.title !== title;
      });
      return newCart;
    });
    setTotal((prev) => {
      return prev - price * amount;
    });
    setTotalAmount((prev) => {
      return prev - amount;
    });
  }

  function increase() {
    setCart((prev) => {
      let target = prev.find((item) => {
        return item.title === title;
      });
      target.amount = amount + 1;
      return [...prev];
    });
    setTotal((prev) => {
      return prev + price;
    });
    setTotalAmount((prev) => {
      return prev + 1;
    });
  }
  function decrease() {
    setCart((prev) => {
      let target = prev.find((item) => {
        return item.title === title;
      });
      target.amount = amount - 1;
      return [...prev];
    });
    setTotal((prev) => {
      return prev - price;
    });
    setTotalAmount((prev) => {
      return prev - 1;
    });
  }
  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        {/* remove button */}
        <button className="remove-btn" onClick={() => removeItem()}>
          remove
        </button>
      </div>
      <div>
        {/* increase amount */}
        <button className="amount-btn" onClick={() => increase()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z" />
          </svg>
        </button>
        {/* amount */}
        <p className="amount">{amount}</p>
        {/* decrease amount */}
        <button className="amount-btn" onClick={() => decrease()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </button>
      </div>
    </article>
  );
};

export default CartItem;
