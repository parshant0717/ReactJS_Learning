import Header from "./src/components/commn_components/Header";
import Body from "./src/components/restaurant_pages/Body";
import ReactDOM from "react-dom/client";
import About from "./src/components/restaurant_pages/About";
import ContactUs from "./src/components/restaurant_pages/ContactUs";
import RestaurantMenu from "./src/components/restaurant_menu/RestaurantMenu";
import Error from "./src/components/commn_components/Error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { lazy, Suspense, useState } from "react";
import Shimmer from "./src/components/commn_components/Shimmer";
import CartContext from "./src/utils/cartContext";
import RestaurantContext from "./src/utils/RestaurantContext";

const InstaMart = lazy(
  () => import("./src/components/restaurant_pages/InstaMart"),
);
/** Same thing but different names:
     Chunking
     Code Splitting
     Dynamic Bundling
     Lazy loading
     on demand loading
     dynamic import
 **/

const App = () => {
  const [cartItem, setCartItem] = useState({});
  const [restaurantID, setRestaurantID] = useState("");
  return (
    <RestaurantContext.Provider value={{ restaurantID, setRestaurantID }}>
      <CartContext.Provider value={{ cartItem, setCartItem }}>
        <div className="app">
          <Header />
          <Outlet />
        </div>
      </CartContext.Provider>
    </RestaurantContext.Provider>
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
        path: "/insta-mart",
        element: (
          <Suspense fallback={<Shimmer />}>
            <InstaMart />
          </Suspense>
        ),
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
