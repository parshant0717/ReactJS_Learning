import DishCard from "./DishCard";
const MenuCard = ({ categoryData }) => {
  const data = categoryData?.card?.card;

  const { title, itemCards } = data;

  return (
    <div>
      <h1 className="catagory-name"> {title} </h1>
      {itemCards.map((items) => {
        const indivisualItems = items?.card?.info;
        return (
          <DishCard key={indivisualItems.id} itemsData={indivisualItems} />
        );
      })}
    </div>
  );
};
export default MenuCard;
