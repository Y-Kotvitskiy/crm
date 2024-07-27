import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showPriceAmount } from "../../utils/utils";
import CardRecord from "../../components/CardRecord/CardRecord";
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
      {Object.keys(items).map((id) => <CardRecord key ={id} id={id} item={items[id]}/>)}
      <div className="cart__footer_buttons">
        <button
          className="cart__order_button"
          onClick={() => navigate(`/Modules/AOS_Invoices/New`)}
        >
          ORDER PIZZAS
        </button>
        <button
          className="cart__clear_button"
          onClick={() => dispatch(clearCard())}
        >
          CLEAR CARD
        </button>
      </div>
    </section>
  );
};

export default Cart;
