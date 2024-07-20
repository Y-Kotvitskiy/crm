import { NavLink } from "react-router-dom";
import { showPriceAmount, shrinkFieldValue } from "./../../Utils/Utils"

const ModuleField = ({ title: titleProps, record, schrink = true }) => {

  let title = titleProps,
    value = (typeof titleProps !== `object`)
      ? record[titleProps] : null;

  if (value && schrink ) value = shrinkFieldValue(value)   

  if (typeof title !== "object" && typeof value === "object") return null;

  if (typeof title === "object") {
    switch (titleProps.type) {
      case `link`:
        {
          title = title.name;
          value = record[titleProps.name];
          const id = record[titleProps.id];
          value = id ? (
            <NavLink to={`/Modules/` + titleProps.module + `/` + id}>{value}</NavLink>
          ) : null;
          break;
        }
      case `money`:
        {
          value = showPriceAmount(record[title.name]);
          title = title.name;
          break;
        }
      case `image`:
        {
          return <img src={record[title.name]} alt={title.name} />;
        }
      default: return null
    }
  }

  return (
    <li className="module-field">
      <span className="module-field__title">{title}:</span>
      <span className="module-field__field-value">{value}</span>
    </li>
  );
};

export default ModuleField;
