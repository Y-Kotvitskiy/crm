import { useReducer, useContext, useEffect } from "react";
import "./ListCart.css";
import ProductCardContext from "../../../../contexts/ProductCardContext";

const ListCart = ({id}) => {
  const {productCard, setProductCard} = useContext(ProductCardContext);

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

  const [productAmount, dispatch] = useReducer(reducer, productCard[id] || 0);

  useEffect (() => {
    if (productAmount !==0) {
      productCard[id] =  productAmount
    } else {
      delete productCard[id]
    }
  }, [productAmount])

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
