const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <h1>Logo</h1>
      </div>
      <div>
        <ul className="navLink-container">
          <li>Home</li>
          <li>About</li>
        </ul>
      </div>
      <div className="cart-container">
        <p>🛒</p>
      </div>
    </div>
  );
};

export default Header;
