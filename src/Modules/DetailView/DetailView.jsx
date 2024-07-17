import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { detailView } from "./../../constants/crm";
import { crm } from "./../../services/suitecrm";

const DetailView = () => {
  const { module, id } = useParams();

  const [record, setRecord] = useState(null);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const getRecord = async () => {
      const crmRecord = await crm.getRecod(module, id);
      console.log(`crmRecord`, crmRecord);
      setRecord(crmRecord);
    };

    getRecord();
  }, []);

  useEffect(() => {
    if (record) {
      setFields(() =>

        detailView[module] && detailView[module].fields
          ? detailView[module].fields
          : Object.keys(record.attributes)
      );
    }
  }, [record]);

  const title =
    detailView[module] && detailView[module].title
      ? detailView[module].title
      : detailView.defaultTitle;

  return !!record && fields.length > 0 ? (
    <section className="detailview">
      <h2 className="detailview__title">{record.attributes[title]}</h2>
      <ul>
        {fields.map((fieldName, index) => {
          let value = record.attributes[fieldName];
          return typeof value !== "object" && value ? (
            <li className="detailview__field" key={index}>
              <span className="detailview__field-title">{fieldName}:</span>
              <span className="detailview__field-value">{value}</span>
            </li>
          ) : null;
        })}
      </ul>
    </section>
  ) : (
    "Loading"
  );
};

export default DetailView;
