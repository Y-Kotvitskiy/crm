import "./ListCart.css";
import {
  increment,
  decrement,
  deleteItem,
} from "../../../../redux/slices/productCartSlice";
import { useDispatch, useSelector } from "react-redux";

const ListCart = ({ id, title = `pizza` }) => {
  const cardItem = useSelector((state) => state.productCart.items[id]);

  const dispatch = useDispatch();

  return (
    <section className="list-cart">
      {cardItem ? (
        <>
          <button
            className="list-cart__incriment"
            onClick={() => dispatch(decrement({ id, title }))}
          >
            -
          </button>
          <span className="list-cart__count">{cardItem.qty}</span>
          <button
            className="list-cart__incriment"
            onClick={() => dispatch(increment({ id, title }))}
          >
            +
          </button>
          <button
            className="list-cart__delete"
            onClick={() => dispatch(deleteItem({ id, title }))}
          >
            Delete
          </button>
        </>
      ) : (
        <button
          className="list-cart__add"
          onClick={() => dispatch(increment({ id, title }))}
        >
          Add to card
        </button>
      )}
    </section>
  );
};

export default ListCart;
