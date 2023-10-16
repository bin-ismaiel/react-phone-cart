import { useContext } from "react";
import CartItem from "./CartItem";
import CartContext from "./context/cart-context";
const CartContainer = () => {
  const cartCtx = useContext(CartContext);
  const cartArray = [...cartCtx.items];

  if (cartArray.length === 0) {
    return (
      <section className="cart">
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {cartArray.map((cartItem) => {
          if (cartItem.amount >= 1) {
            return <CartItem key={cartItem.id} {...cartItem} />;
          }
        })}
      </div>
      <footer>
        <hr />
        <div>
          <h5 className="cart-total">
            total <span>${cartCtx.totalPrice}</span>
          </h5>
        </div>
        <button className="btn btn-hipster" onClick={() => cartCtx.clearCart()}>
          clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
