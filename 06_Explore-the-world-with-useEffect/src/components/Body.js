import RestaurantCards from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useState, useEffect } from "react";
import { APIURL, POSTURL } from "../utils/constant";

const Body = () => {
  const [resList, setResList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchRes, setSearchRes] = useState("");

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
    const filteredList = resList.filter((val) => val.info.avgRating > 4.2);
    setFilteredList(filteredList);
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
              setFilteredList(searchedList);
            }}
          >
            Search
          </button>
          <button
            onClick={() => {
              fetchPostData();
            }}
          >
            Fetch Post
          </button>
        </div>
      </div>
      <div className="res-compContainer">
        {filteredList.map((apiData) => (
          <RestaurantCards key={apiData.info.id} data={apiData.info} />
        ))}
      </div>
    </div>
  );
};

export default Body;
