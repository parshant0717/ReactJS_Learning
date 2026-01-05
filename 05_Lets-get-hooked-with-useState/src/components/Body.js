import RestaurantCards from "./RestaurantCard";
import restaurantLists from "../utils/mockData";
import { useState } from "react";

const Body = () => {
  const [resList, setResList] = useState(restaurantLists);

  const filterResList = () => {
    const filteredList = resList.filter((val) => val.avgRating > 4.2);
    setResList(filteredList);
  };
  return (
    <div className="body-container">
      <div className="filterAndSearch">
        <button className="filter" onClick={filterResList}>
          Filter List
        </button>
        <button
          className="remove-filter"
          onClick={() => setResList(restaurantLists)}
        >
          Remove Filter
        </button>
      </div>
      <div className="res-compContainer">
        {resList.map((apiData) => (
          <RestaurantCards key={apiData.id} data={apiData} />
        ))}
      </div>
    </div>
  );
};

export default Body;
