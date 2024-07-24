import { useSelector } from "react-redux";
import { showPriceAmount } from "../../utils/utils";
import ListCart from "../../components/List/ListRecord/ListCart/ListCart";

const Cart = () => {
  const { items, totalCount, totalSum } = useSelector(
    (state) => state.productCart
  );

  return (
    <section>
      <h2>
        Your cart, item: {totalCount} pcs., total price{" "}
        {showPriceAmount(totalSum)}
      </h2>
      {Object.keys(items).map((id) => (
        <p key={id}>
          {items[id].qty} x {items[id].pizza.name}{" "}
          {showPriceAmount(items[id].pizza.price)}
          <ListCart id={id} pizza={items[id].pizza} />
        </p>
      ))}
    </section>
  );
};

export default Cart;
