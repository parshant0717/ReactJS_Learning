import Header from "./src/components/commn_components/Header";
import Body from "./src/components/restaurant_pages/Body";
import ReactDOM from "react-dom/client";
import About from "./src/components/restaurant_pages/About";
import ContactUs from "./src/components/restaurant_pages/ContactUs";
import RestaurantMenu from "./src/components/restaurant_menu/RestaurantMenu";
import Error from "./src/components/commn_components/Error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);

// root.render(<App />);
