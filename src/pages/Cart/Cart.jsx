import { useSelector } from "react-redux";

const Cart = () => {
  const { items } = useSelector((state) => state.productCart);
  console.log(`items`, items);

  return (
    <div>
      {Object.keys(items).map((id) => (
        <p>{items[id].pizza.name}</p>
      ))}
    </div>
  );
};

export default Cart;
