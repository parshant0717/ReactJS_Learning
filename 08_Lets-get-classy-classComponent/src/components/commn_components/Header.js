import { Link, NavLink } from "react-router";

const Header = () => {
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
        </ul>
      </div>
      <div className="cart-container">
        <p>🛒</p>
      </div>
    </div>
  );
};

export default Header;
