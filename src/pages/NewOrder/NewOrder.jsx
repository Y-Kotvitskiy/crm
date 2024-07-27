import { useSelector } from "react-redux";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { crm } from "../../services/suitecrm";
import { showPriceAmount } from "../../utils/utils";
import "./NewOrder.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCard } from "../../redux/slices/productCartSlice";
import { AuthContext } from "../../App";
import { useContext } from "react";

const NewOrder = () => {
  const { items, totalSum } = useSelector((state) => state.productCart),
    { setAuth } = useContext(AuthContext),
    dispatch = useDispatch(),
    navigate = useNavigate();

  const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
  );

  const schema = z.object({
    customer: z.string().trim().min(4).max(150),
    phone: z.string().min(11).regex(phoneRegex, "Invalid Number!"),
    address: z.string().min(5).max(255),
    priority: z.boolean(),
  });

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setValue,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      customer: `user1`,
      phone: `050-123-4567`,
      address: `Levka Lukianenka Ave, 17, Chernigiv`,
    },
    resolver: zodResolver(schema),
  });

  const hadleFormSubmit = async (data) => {
    const description = JSON.stringify(items);
    const requestAtributes = {
      name: data.customer,
      phone_c: data.phone,
      priority_c: data.priority,
      shipping_address_city: data.address,
      description,
    };
    const responce = await crm.createInvoice(requestAtributes);
    if (responce.data && responce.data.id) {
      dispatch(clearCard());
      setAuth( () => data.customer )
      navigate("/Modules/AOS_Invoices/" + responce.data.id);
    } else {
      alert("API error!");
    }
  };

  return (
    <section>
      <h2>Ready to order? Let`s go!</h2>
      <form
        className="new-order__form"
        onSubmit={handleSubmit(hadleFormSubmit)}
      >
        <fieldset className="new-order__fiedset">
          <div className="new-order__field">
            <label>Firs Name</label>
            <input
              {...register("customer")}
              name="customer"
              type="text"
              className={errors.customer ? "validation_error" : ""}
            />
          </div>
          <p className="new-order__error">
            {errors.customer && errors.customer.message}
          </p>
          <div className="new-order__field">
            <label>Phone number</label>
            <input
              {...register("phone")}
              name="phone"
              type="text"
              className={errors.phone ? "validation_error" : ""}
            />
          </div>
          <p className={"new-order__error "}>
            {errors.phone && errors.phone.message}
          </p>
          <div className="new-order__field">
            <label>Address</label>
            <input
              {...register("address")}
              name="address"
              type="text"
              className={errors.address ? "validation_error" : ""}
            />
          </div>
          <p className="new-order__error">
            {errors.address && errors.address.message}
          </p>
          <div className="new-order__checkbox">
            <input {...register("priority")} name="priority" type="checkbox" />
            <label>Want to give your order priority?</label>
          </div>
          <p className="new-order__error"></p>
        </fieldset>
        <button disabled={!isValid}>
          ORDER NOW FOR {showPriceAmount(totalSum)}
        </button>
      </form>
    </section>
  );
};

export default NewOrder;
