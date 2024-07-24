import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { showPriceAmount } from "../../utils/utils";
import ListCart from "../../components/List/ListRecord/ListCart/ListCart";
import { clearCard } from "../../redux/slices/productCartSlice";
import "./Cart.css";

const Cart = () => {
  const { items, totalCount, totalSum } = useSelector(
    (state) => state.productCart
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!totalCount) navigate(`/Modules/AOS_Products`);
  }, [totalCount]);

  return (
    <section>
      <h2 className="card__title">
        <span>Your order:</span>
        <span>
          {totalCount} pcs., {showPriceAmount(totalSum)}
        </span>
      </h2>
      {Object.keys(items).map((id) => (
        <div className="card__record" key={id}>
          <div className="card__images">
            <img
              className="card__image"
              src={items[id].pizza.product_image}
              alt={items[id].pizza.name}
            />
            {}
          </div>
          <div className="card__attributes">
            <span className="card__text">{items[id].qty} x </span>
            <NavLink to={`/Modules/AOS_Products/` + id}>
              {items[id].pizza.name}
            </NavLink>
            <span className="card__text">
              {" "}
              {showPriceAmount(items[id].pizza.price)}
            </span>
          </div>
          <div className="card__buttons">
            <ListCart id={id} pizza={items[id].pizza} />
          </div>
        </div>
      ))}
      <div className="cart__footer_buttons">
        <button className="cart__order_button">ORDER PIZZAS</button>
        <button className="cart__clear_button" onClick={() => dispatch(clearCard())}>CLEAR CARD</button>
      </div>
    </section>
  );
};

export default Cart;
