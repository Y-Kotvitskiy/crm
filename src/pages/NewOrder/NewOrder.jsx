import { useSelector } from "react-redux";
import { crm } from "../../services/suitecrm";
import { showPriceAmount } from "../../utils/utils";
import "./NewOrder.css";

const NewOrder = () => {
  const handleCreate = async () => {
    const data = await crm.createInvoice();
    console.log("Create", data);
  };

  const { totalSum } = useSelector((state) => state.productCart);
  console.log(`card`);

  return (
    <section>
      <h2>Ready to order? Let`s go!</h2>
      <form>
        <fieldset className="new-order__fiedset">
          <div className="new-order__field">
            <label>Firs Name</label> <input name="name" type="text" />
          </div>
          <div className="new-order__field">
            <label>Phone number</label> <input type="number" />
          </div>
          <div className="new-order__field">
            <label>Address</label> <input type="text" />
          </div>
        </fieldset>
        <button onClick={handleCreate}>
          ORDER NOW FOR {showPriceAmount(totalSum)}
        </button>
      </form>
    </section>
  );
};

export default NewOrder;
