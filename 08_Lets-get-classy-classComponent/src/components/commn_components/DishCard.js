import { useState } from "react";
import { DISH_IMG } from "../../utils/constant";

const DishCard = ({ itemsData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { name, price, defaultPrice, ratings, description, imageId } =
    itemsData;

  if (!description) return null;
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
      </div>
      <div className="dish-image">
        {imageId && <img src={DISH_IMG + imageId} alt="dishImage" />}
        <button className="add-to-cart">ADD</button>
      </div>
    </div>
  );
};

export default DishCard;
