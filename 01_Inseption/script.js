/*** This is how react works. ***/

// const heading = React.createElement(
//   "h1",
//   {
//     id: "heading",
//     xyz: "abc",
//   },
//   "Hello World from react!"
// );

/** This is how we can create parent and children elements ****/
// const parent = React.createElement(
//   "h1",
//   { id: "parent" },
//   "I'm the parent tag!",
//   React.createElement("p", {}, "I'm the children tag!")
// );

/*** We can also create array of childrens and these all are object under the hood***/
const parentEl = React.createElement("div", { id: "parent" }, [
  React.createElement("h2", { id: "childFirst" }, "This is First child."),
  React.createElement("h2", { id: "childSecond" }, "This is Second child."),
]);

// This is how react dom render element at selected origin..
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(parentEl);
