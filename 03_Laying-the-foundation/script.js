import React from "react";
import ReactDOM from "react-dom/client";

//React Elements
const Heading = <h1 className="head">This is react element.</h1>;

// React Component
const HeadingComponent = function () {
  return (
    <div>
      <p>This is p tag.</p>
    </div>
  );
};

//Component Composition
const Main = () => {
  return (
    <div>
      {/* When we use component inside component is called compo */}
      <HeadingComponent />
      <p>Normal text.</p>
      {Heading}{" "}
      {/*Like this we can put any elements or any js variable inside component.*/}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Main />);
