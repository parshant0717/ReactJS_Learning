import { useContext, useState } from "react";
import { DISH_IMG } from "../../utils/constant";
import CartContext from "../../utils/cartContext";
import RestaurantContext from "../../utils/RestaurantContext";
import { useParams } from "react-router";

const DishCard = ({ itemsData }) => {
  const { id, name, price, defaultPrice, ratings, description, imageId } =
    itemsData;

  console.log(name);

  const { resId } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const { cartItem, setCartItem } = useContext(CartContext);
  const { restaurantID, setRestaurantID } = useContext(RestaurantContext);

  const currentQuantity = cartItem[id]?.quantity || 0;
  const isCartEmpty = cartItem && Object.entries(cartItem).length === 0;

  const handleAddItem = () => {
    if (restaurantID && !isCartEmpty && restaurantID !== resId) {
      const isEmpty = confirm("Do you want to empty the cart?");
      if (isEmpty) {
        setCartItem({});
      }
    } else {
      setRestaurantID(resId);
      setCartItem((prevItem) => ({
        ...prevItem,
        [id]: {
          restaurantId: resId,
          id: id,
          name: name,
          price: price / 100 || defaultPrice / 100,
          quantity: 1,
        },
      }));
    }
  };

  const handleIncrementQuantity = () => {
    setCartItem((prevItem) => ({
      ...prevItem,
      [id]: {
        ...prevItem[id],
        quantity: prevItem[id].quantity + 1,
      },
    }));
  };

  const handleDecrementQuantity = () => {
    setCartItem((prevItem) => {
      const updatedCart = { ...prevItem };
      if (updatedCart[id].quantity > 1) {
        updatedCart[id].quantity -= 1;
      } else {
        delete updatedCart[id];
      }
      return updatedCart;
    });
  };

  // if (!description) return "";
  return (
    <div className="dishCard-container">
      <div className="dish-details">
        <p className="dishName">{name}</p>
        <p className="dishPrice">{`₹${price / 100 || defaultPrice / 100}`}</p>
        {ratings?.aggregatedRating?.rating && (
          <p className="dishRating">
            {`◇ ${ratings?.aggregatedRating?.rating}`}
            <span className="dishRating-count">{` (${ratings?.aggregatedRating?.ratingCountV2})`}</span>
          </p>
        )}

        {description && (
          <p className="dish-description">
            {isExpanded ? description : description.slice(0, 150)}
            <span
              onClick={() => {
                setIsExpanded((prev) => !prev);
              }}
              className="description-extender"
            >
              {!isExpanded && description.length > 150 ? "... more " : ""}
            </span>
          </p>
        )}
      </div>
      <div className="dish-image">
        {imageId && <img src={DISH_IMG + imageId} alt="dishImage" />}
        <button className="add-to-cart">
          {currentQuantity === 0 ? (
            <div onClick={handleAddItem}> Add</div>
          ) : (
            <div className="add-to-cart-btn">
              <span onClick={handleDecrementQuantity}>-</span>
              <span>{currentQuantity}</span>
              <span onClick={handleIncrementQuantity}>+</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default DishCard;
