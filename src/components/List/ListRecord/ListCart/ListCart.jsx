import { useReducer } from "react";
import "./ListCart.css";

const ListCart = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case `Increment`:
        return ++state;
      case `Decrement`:
        return --state;
      case `Delete`:
        return 0;
      default:
        return state;
    }
  };

  const [productAmount, dispatch] = useReducer(reducer, 0);

  return (
    <section className="list-cart">
      {productAmount ? (
        <>
          <button
            className="list-cart__incriment"
            onClick={() => dispatch({ type: `Decrement` })}
          >
            -
          </button>
          <span className="list-cart__count">{productAmount}</span>
          <button
            className="list-cart__incriment"
            onClick={() => dispatch({ type: `Increment` })}
          >
            +
          </button>
          <button
            className="list-cart__delete"
            onClick={() => dispatch({ type: `Delete` })}
          >
            Delete
          </button>
        </>
      ) : (
        <button
          className="list-cart__add"
          onClick={() => dispatch({ type: `Increment` })}
        >
          Add to card
        </button>
      )}
    </section>
  );
};

export default ListCart;
