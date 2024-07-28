import ListCart from "../List/ListRecord/ListCart/ListCart";
import { NavLink } from "react-router-dom";
import { showPriceAmount } from "../../utils/utils";
import "./CardRecord.css";

const CardRecord = ({ id, item, buttons = true, calcTotal = false }) => {
  return (
    <div className="card__record">
      <div className="card__images">
        <img
          className="card__image"
          src={item.pizza.product_image}
          alt={item.pizza.name}
        />
      </div>
      <div className="card__attributes">
        <span className="card__text">{item.qty+ `x`}</span>
        <NavLink to={`/Modules/AOS_Products/` + id}>{item.pizza.name}</NavLink>
        <span className="card__text card_price"> {showPriceAmount((calcTotal? item.qty * item.pizza.price : item.pizza.price))}</span>
      </div>
      {buttons ? (
        <div className="card__buttons">
          <ListCart id={id} pizza={item.pizza} />
        </div>
      ) : null}
    </div>
  );
};

export default CardRecord;
