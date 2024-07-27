import useDetailView from "../../hooks/useDetailView";
import CardRecord from "../../components/CardRecord/CardRecord";
import { parceItems } from "../../utils/utils";
import "./OrderDetailView.css";

const OrderDetailView = () => {
  const { module, title, record, fields, isLoadint, error } =
    useDetailView("AOS_Invoices");

  if (isLoadint) {
    return <p>{module} record data is loading ..</p>;
  }

  if (error) {
    console.error(error);
    return <p> Failed fetching record data .. </p>;
  }

  const items = parceItems(record.attributes.description);

  return record && fields.length > 0 ? (
    <section className="orderview">
      <h2 className="orderview__title">
        <span> Order #: {record.attributes[title]} </span>
        <span> status: {record.attributes[`status`]}</span>
        <span className="orderview__title_properties">
          {record.attributes.status === `preparing` ? (
            <span className="orderview__preparing">PREPARING ORDER</span>
          ) : null}
        </span>
      </h2>
      {items
        ? Object.keys(items).map((id) => (
            <CardRecord key={id} item={items[id]} buttons={false} />
          ))
        : mull}
    </section>
  ) : (
    "Loading"
  );
};

export default OrderDetailView;
