import { Link, NavLink } from "react-router";
import useOnlineStatus from "../../utils/useOnlineStatus";
import logo from "url:../../assets/companyLogo.png";
import { useContext } from "react";
import CartContext from "../../utils/cartContext";

const Header = () => {
  const onlineStatus = useOnlineStatus();
  const { cartItem } = useContext(CartContext);
  const totalItemCount = Object.values(cartItem).reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <div className="header">
      <div className="logo-container">
        <h1>
          <NavLink to="/">
            <img src={logo} alt="Logo" className="logo-img" />
          </NavLink>
        </h1>
      </div>
      <div>
        <ul className="navLink-container">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="about">About</Link>
          </li>
          <li>
            <Link to="contact-us">Contact us</Link>
          </li>
          <li>
            <Link to="insta-mart">InstaMart</Link>
          </li>
        </ul>
      </div>

      <div className="cart-container">
        <p>Online Status:{onlineStatus ? "🟢" : "🔴"}</p>
        <span>🛒</span>
        {totalItemCount > 0 && (
          <span className="cart-count">{totalItemCount}</span>
        )}
      </div>
    </div>
  );
};

export default Header;
