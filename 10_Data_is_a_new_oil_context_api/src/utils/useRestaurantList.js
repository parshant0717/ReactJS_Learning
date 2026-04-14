import { useState, useEffect } from "react";
import { APIURL } from "./constant";

const useRestaurantList = () => {
  const [resList, setResList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

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
    } catch (error) {
      console.error("An error occured" + error.message);
    }
  };

  return resList;
};

export default useRestaurantList;
