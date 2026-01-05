import Header from "./src/components/Header";
import Body from "./src/components/Body";
import ReactDOM from "react-dom/client";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
