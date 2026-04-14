import { imageUrl } from "../../utils/constant";

const RestaurantCards = ({ data }) => {
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } =
    data;

  return (
    <div className="resCard-container">
      <img src={imageUrl + cloudinaryImageId} alt="img" className="res-img" />
      <div id="resText-container">
        <h3 id="res-name">{name}</h3>
        <h5 className="res-rating">{avgRating} stars</h5>
        <h5>{cuisines.join(", ")}</h5>
        <h5>{costForTwo}</h5>
        <h5>{sla.slaString}</h5>
      </div>
    </div>
  );
};

export const promotedRestaurnatCards = (RestaurantCards) => {
  return (propsData) => {
    return (
      <div
        style={{
          position: "relative",
          height: "100%",
        }}
      >
        <label
          style={{
            position: "absolute",
            fontSize: "small",
            backgroundColor: "black",
            color: "white",
            padding: "2px",
            borderRadius: "4px",
            top: "2px",
            left: "2px",
          }}
        >
          Promoted
        </label>
        <RestaurantCards {...propsData} />
      </div>
    );
  };
};

export default RestaurantCards;
