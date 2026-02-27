import RestaurantCards from "../commn_components/RestaurantCard";
import Shimmer from "../commn_components/Shimmer";
import { useState, useEffect } from "react";
import { APIURL } from "../../utils/constant";
import { Link, Links } from "react-router";

const Body = () => {
  const [resList, setResList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchRes, setSearchRes] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async () => {
    try {
      const data = await fetch(APIURL);
      const json = await data.json();

      const cards = json?.data?.cards.find((card) => {
        return card?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      });

      const renderList =
        cards?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      setResList(renderList);
      setFilteredList(renderList);
    } catch (error) {
      console.error("An error occured" + error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const topRatedResList = () => {
    const topRatedList = resList.filter((val) => val.info.avgRating > 4.3);
    setFilteredList(topRatedList);
  };

  if (resList.length === 0) {
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
              setFilteredList(resList);
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
              const searchedList = resList.filter((value) => {
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
