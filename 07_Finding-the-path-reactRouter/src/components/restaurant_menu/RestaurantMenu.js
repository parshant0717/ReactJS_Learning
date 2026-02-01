import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "./RestaurantMenu.module.css";
import MenuCard from "../commn_components/MenuCard";
import { MENU_API_URL } from "../../utils/constant";
import Shimmer from "../commn_components/Shimmer";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const [menuDetails, setMenuDetails] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [isVeg, setIsVeg] = useState(false);
  const [isNonVeg, setIsNonVeg] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [notFound, setNotFound] = useState("");
  const { resId } = useParams();

  const fetchResInfo = async () => {
    try {
      const responseData = await fetch(MENU_API_URL + resId);
      const json = await responseData.json();

      const restaurantData = json?.data?.cards.find((infoSource) => {
        return infoSource?.card?.card?.info;
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
      setFilteredMenu(customCategoriesData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleFilter = () => {
    if (!isVeg && !isNonVeg && searchText === "") {
      setFilteredMenu(menuDetails);
      return;
    }

    const deepCopyMenu = structuredClone(menuDetails);

    const filteredMenuList = deepCopyMenu
      .map((category) => {
        const items = category?.card?.card?.itemCards || [];

        const matchingItems = items.filter((itemData) => {
          const info = itemData?.card?.info;
          const classifier = info?.itemAttribute?.vegClassifier;
          const dishName = info?.name?.toLowerCase() || "";

          const isTypeMatch =
            (isVeg && classifier === "VEG") ||
            (isNonVeg && classifier === "NONVEG") ||
            (!isVeg && !isNonVeg);

          const isSearchMatch = dishName.includes(searchText.toLowerCase());

          return isTypeMatch && isSearchMatch;
        });

        if (category?.card?.card) {
          category.card.card.itemCards = matchingItems;
        }
        return category;
      })
      .filter((catagory) => catagory?.card?.card?.itemCards.length > 0);
    if (filteredMenuList.length === 0) {
      setNotFound(`Sorry, we couldn't find any results for "${searchText}"`);
    } else {
      setNotFound("");
    }
    setFilteredMenu(filteredMenuList);
  };

  useEffect(() => {
    handleFilter();
  }, [isVeg, isNonVeg, searchText, menuDetails]);

  useEffect(() => {
    fetchResInfo();
  }, [resId]);

  if (resInfo === null) {
    return <Shimmer />;
  }

  const {
    name,
    totalRatingsString,
    avgRatingString,
    costForTwoMessage,
    cuisines,
    locality,
    sla,
  } = resInfo?.card?.card?.info;

  return (
    <div className={styles["resMenu-container"]}>
      <div className={styles["resInfo-container"]}>
        <h1>{name}</h1>
        <div className={styles["resInfo"]}>
          <h3>
            {avgRatingString}
            {` (${totalRatingsString}) `} . {costForTwoMessage}
          </h3>
          <p className={styles["res-cusines"]}>{cuisines.join(", ")}</p>
          <p className={styles["outlet-details"]}>
            {"Outlet"}
            <span className={styles["outlet-address"]}>{locality}</span>
          </p>
          <p className={styles["outlet-details"]}>
            {sla.slaString.toLowerCase()}
          </p>
        </div>
      </div>
      <h3 className={styles["menu-heading"]}>Menu</h3>
      <div className={styles["resMenu-custom-filters"]}>
        <div className={styles["search-filter"]}>
          <input
            type="text"
            placeholder="Search For dishes"
            id={styles["search-bar"]}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </div>
        <div className={styles["toggle-filters"]}>
          <div className={styles["toggle-filter-container"]}>
            <label htmlFor="veg-input">Veg</label>
            <input
              checked={isVeg}
              onChange={() => {
                setIsVeg((prev) => !prev);
              }}
              type="checkbox"
              name=""
              id="veg-input"
            />
          </div>
          <div className={styles["toggle-filter-container"]}>
            <label htmlFor="non-veg-input">Non-Veg</label>
            <input
              checked={isNonVeg}
              onChange={() => {
                setIsNonVeg((prev) => !prev);
              }}
              type="checkbox"
              name=""
              id="non-veg-input"
            />
          </div>
        </div>
      </div>
      {notFound && <div className={styles["dish-not-found"]}>{notFound}</div>}
      <div className={styles["menu-dish-container"]}>
        <div className="category-with-dish">
          {filteredMenu.map((individualCategory) => {
            return (
              <MenuCard
                key={individualCategory.card.card.categoryId}
                categoryData={individualCategory}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
