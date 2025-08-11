import React from "react";
import ReactDOM from "react-dom/client";

//Insted of using react from CDN(Content Delivery Network), We're using it as dependency after installing it using npm. That's why we imported react and reactdom from node modules.
const heading = React.createElement("h1", {}, "This is react app.");
console.log(heading);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(heading);
