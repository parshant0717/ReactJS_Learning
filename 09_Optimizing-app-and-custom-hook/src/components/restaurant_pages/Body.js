import RestaurantCards from "../commn_components/RestaurantCard";
import Shimmer from "../commn_components/Shimmer";
import { useState, useEffect } from "react";

import { Link, Links } from "react-router";
import useOnlineStatus from "../../utils/useOnlineStatus";
import useRestaurantList from "../../utils/useRestaurantList";

const Body = () => {
  const [filteredList, setFilteredList] = useState([]);
  const [searchRes, setSearchRes] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onlineStatus = useOnlineStatus();
  const restaurantList = useRestaurantList();

  useEffect(() => {
    setFilteredList(restaurantList);
  }, [restaurantList]);

  const topRatedResList = () => {
    const topRatedList = restaurantList.filter(
      (val) => val.info.avgRating > 4.3,
    );
    setFilteredList(topRatedList);
  };

  if (!onlineStatus) {
    return (
      <div
        style={{
          marginBlock: "32px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>You are Offline!</h1>
        <p>Please Check Your Internet Connection.</p>
      </div>
    );
  }

  if (restaurantList.length === 0) {
    return <Shimmer />;
  }
  return (
    <div className="body-container">
      <div className="filterAndSearch">
        <div className="filter-section">
          <button className="filter" onClick={topRatedResList}>
            Top Rated Restaurants
          </button>
          <button
            className="remove-filter"
            onClick={() => {
              setFilteredList(restaurantList);
            }}
          >
            Show All
          </button>
        </div>
        <div className="search-section">
          <input
            type="text"
            name=""
            id="textInput"
            value={searchRes}
            onChange={(e) => {
              setSearchRes(e.target.value.toLocaleLowerCase());
            }}
          />
          <button
            onClick={() => {
              const searchedList = restaurantList.filter((value) => {
                return value.info.name.toLocaleLowerCase().includes(searchRes);
              });
              console.log(searchedList);

              if (searchedList.length === 0) {
                setErrorMessage(
                  `Sorry, we couldn't find any results for "${searchRes}"`,
                );
              } else {
                setErrorMessage("");
              }

              setFilteredList(searchedList);
            }}
          >
            Search
          </button>
        </div>
      </div>
      {errorMessage && (
        <div className="restaurant-not-found">{errorMessage}</div>
      )}
      <div className="res-compContainer">
        {filteredList.map((apiData) => (
          <Link key={apiData.info.id} to={`/restaurants/${apiData.info.id}`}>
            <RestaurantCards data={apiData.info} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
