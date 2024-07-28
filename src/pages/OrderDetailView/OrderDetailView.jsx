import useDetailView from "../../hooks/useDetailView";
import CardRecord from "../../components/CardRecord/CardRecord";
import { parceItems } from "../../utils/utils";
import { showPriceAmount } from "../../utils/utils";
import { prioritySum } from "../../constants/crm";
import { useCallback, useEffect, useState } from "react";
import { crm } from "../../services/suitecrm";
import "./OrderDetailView.css";

const OrderDetailView = () => {
  const { module, title, record, fields, isLoadint, error } =
    useDetailView("AOS_Invoices");

  const [prioritize, setPriority] = useState(null);

  const deliveryDate = useCallback((deliveryDateString) => {
    if (!deliveryDateString) return "";
    let options = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    const date = new Date(deliveryDateString);
    return date.toLocaleDateString(navigator.language, options);
  });

  const dateMessage = useCallback((deliveryDateString) => {
    if (!deliveryDateString) return "*";
    const date = new Date(deliveryDateString),
      now = new Date();
    const hours = Math.abs(now - date) / 36e5,
      minutes = Math.round((hours - Math.trunc(hours)) * 60);
    let housrStr = ``;
    if (hours > 1) {
      housrStr = hours >= 2 ? `${Math.round(hours)} hours` : `1 hour`;
    }
    return `Only ${housrStr} ${minutes} minutes left`;
  });

  useEffect(() => {
    if (record)
      setPriority(() => record && record.attributes.priority_c === `1`);
  }, [record]);

  const [isUpdating, setUpdating] = useState(false);

  const patchPrioritize = async () => {
    try {
      const responce = await crm.updateInvoice(record.id, { priority_c: `1` });
      const priority = responce.data.attributes.priority_c;
      setPriority(() => priority === `1`);
    } catch (e) {
      alert(JSON.stringify(e));
    }
  };

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
        <span className="orderview__title_text">
          <span> Order #: {record.attributes[title]} </span>
          <span> status: {record.attributes[`status`]}</span>
        </span>
        <span className="orderview__title_properties">
          {prioritize ? (
            <span className="orderview__priority">PRIORITY</span>
          ) : null}
          {record.attributes.status === `preparing` ? (
            <span className="orderview__preparing">PREPARING ORDER</span>
          ) : null}
        </span>
      </h2>
      <div className="orderview__time">
        <span>{dateMessage(record.attributes.delivery_date_c)}</span>
        <span>
          (Estimated delivery {deliveryDate(record.attributes.delivery_date_c)})
        </span>
      </div>

      {items
        ? Object.keys(items).map((id) => (
            <CardRecord
              key={id}
              id={id}
              item={items[id]}
              buttons={false}
              calcTotal={true}
            />
          ))
        : mull}
      <div className="orderview__footer">
        <p>Price pizza {showPriceAmount(record.attributes.total_amt)}</p>
        {prioritize ? (
          <p>Price priority {showPriceAmount(prioritySum)}</p>
        ) : null}
        <p className="orderview__footer_total">
          To pay on delivery{" "}
          {showPriceAmount(
            prioritize
              ? +record.attributes.total_amt + prioritySum
              : +record.attributes.total_amt
          )}
        </p>
      </div>
      {!prioritize ? (
        <div className="orderview__footer_buton">
          <button
            className="orderview__prioritize_buton"
            disabled={isUpdating}
            onClick={patchPrioritize}
          >
            PRIORITIZE
          </button>
        </div>
      ) : null}
    </section>
  ) : (
    "Loading"
  );
};

export default OrderDetailView;
