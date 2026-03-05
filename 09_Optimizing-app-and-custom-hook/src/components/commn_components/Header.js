import { Link, NavLink } from "react-router";
import useOnlineStatus from "../../utils/useOnlineStatus";

const Header = () => {
  const onlineStatus = useOnlineStatus();
  return (
    <div className="header">
      <div className="logo-container">
        <h1>
          <NavLink to="/">Logo</NavLink>
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
        <p>🛒</p>
      </div>
    </div>
  );
};

export default Header;
