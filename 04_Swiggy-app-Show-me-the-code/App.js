/*
 *Header
    -Logo
    -Home
    -About
    -Cart
 *Body
    -searchbar
    -restaurant container
      -restaurent card
        -img
        -name of res., stars rating, cusine, delivery time.
 *Footer
    -Copyrights
    -Links
    -Address
    -Contact
 */

import React from "react";
import ReactDOM from "react-dom/client";
import obj from "./api";

const resData = obj;
console.log(resData[0].name);

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
// name, avgRating, cuisines
const RestaurentCards = ({ data }) => {
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } =
    data;

  return (
    <div className="resCard-container">
      <img
        src={
          `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_308,c_fill/` +
          cloudinaryImageId
        }
        alt="img"
        className="res-img"
      />
      <div id="resText-container">
        <h3 id="res-name">{name}</h3>
        <h5>{cuisines.join(", ")}</h5>
        <h5>{avgRating} stars</h5>
        <h5>{costForTwo}</h5>
        <h5>{sla.slaString}</h5>
      </div>
    </div>
  );
};

const Body = () => {
  return (
    <div className="body-container">
      <div className="searchbar">search bar</div>
      <div className="res-compContainer">
        {resData.map((apiData) => (
          <RestaurentCards key={apiData.id} data={apiData} />
        ))}
      </div>
    </div>
  );
};

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout />);
