import useDetailView from "../../hooks/useDetailView";
import CardRecord from "../../components/CardRecord/CardRecord";
import { parceItems } from "../../utils/utils";
import "./OrderDetailView.css"

const OrderDetailView = () => {
  const {
    module,
    title,
    record,
    fields,
    isLoadint,
    error,
  } = useDetailView("AOS_Invoices");

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
        <span className="orderview__module_title">Order #: </span>
        <span className="orderview__record_name">
          {record.attributes[title]}
        </span>
        <span className="orderview__module_title"> status: </span>
        <span className="orderview__record_name">
          {record.attributes[`status`]}
        </span>
      </h2>
      {items
        ? Object.keys(items).map((id) => (
            <CardRecord key={id} item={items[id]} buttons = {false}/>
          ))
        : mull} 
    </section>
  ) : (
    "Loading"
  );
};

export default OrderDetailView;
