import DishCard from "./DishCard";
const MenuCard = ({ categoryData, showItems, setShowIndex, itemIndex }) => {
  const data = categoryData?.card?.card;

  const { title, itemCards } = data;

  const handleClick = () => {
    if (showItems) {
      setShowIndex(null);
    } else if (!showItems) {
      setShowIndex(itemIndex);
    }
  };

  return (
    <div className="menu-container">
      <div className="sperater"></div>
      <div className="menu-title" onClick={handleClick}>
        <span className="catagory-name"> {title} </span>
        <span>{showItems ? "▼" : "▲"}</span>
      </div>
      {itemCards.map((items) => {
        const indivisualItems = items?.card?.info;
        return (
          showItems && (
            <DishCard key={indivisualItems.id} itemsData={indivisualItems} />
          )
        );
      })}
    </div>
  );
};
export default MenuCard;
