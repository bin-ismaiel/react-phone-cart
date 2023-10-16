import { useContext } from "react";
import { FaCartPlus } from "react-icons/fa";
import CartContext from "./context/cart-context";
const Navbar = () => {
  const ctx = useContext(CartContext);
  return (
    <nav>
      <div className="nav-center">
        <h4>useReducer</h4>
        <div className="nav-container">
          <FaCartPlus className="cart-icon" />
          <div className="amount-container">
            <p className="total-amount">{ctx.totalItems}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
