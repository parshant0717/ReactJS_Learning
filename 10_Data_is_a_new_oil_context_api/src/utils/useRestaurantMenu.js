import { useEffect, useState } from "react";
import { MENU_API_URL } from "./constant";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  const [menuDetails, setMenuDetails] = useState([]);

  useEffect(() => {
    fetchResInfo(resId);
  }, [resId]);

  const fetchResInfo = async () => {
    try {
      const responseData = await fetch(MENU_API_URL + resId);
      const json = await responseData.json();

      const restaurantData = json?.data?.cards.find((infoSource) => {
        return (
          infoSource?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
        );
      });

      const menuData = json?.data?.cards.find((categorySource) => {
        return categorySource?.groupedCard;
      });

      const menuCategories =
        menuData?.groupedCard?.cardGroupMap?.REGULAR?.cards;

      const customCategoriesData = menuCategories.filter((data) => {
        return data?.card?.card?.itemCards;
      });

      setResInfo(restaurantData);
      setMenuDetails(customCategoriesData);
    } catch (error) {
      console.error(error.message);
    }
  };

  return {
    resInfo: resInfo,
    menuDetails: menuDetails,
  };
};

export default useRestaurantMenu;
