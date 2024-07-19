import { NavLink } from "react-router-dom";

const ModuleField = ({ title: titleProps, record }) => {
  let title = titleProps,
    value = record[titleProps];

  if (typeof title !== "object" && typeof value === "object") return null;

  if (typeof title === "object") {
    title = title.name;
    value = record[titleProps.name];
    const id = record[titleProps.id];
    value = id ? (
      <NavLink to={`/Modules/` + titleProps.module + `/` + id}>{value}</NavLink>
    ) : null;
  }

  return (
    <li className="module-field">
      <span className="module-field__title">{title}:</span>
      <span className="module-field__field-value">{value}</span>
    </li>
  );
};

export default ModuleField;
