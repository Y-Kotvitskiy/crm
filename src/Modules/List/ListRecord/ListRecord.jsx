import { NavLink } from "react-router-dom";

const ListRecord = ({ id, record, fields: fieldsProps, title = `name` }) => {
  const fields = fieldsProps ? fieldsProps : Object.keys(record);

  const fieldRender = (fieldName, index) => {
    let title, value;
    if (typeof fieldName === "object") {
      title = fieldName.name;
      value = record[fieldName.name];
      const id = record[fieldName.id];
      value = (id) ?
       (
        <NavLink to={`/Modules/` + fieldName.module + `/` + id}>
          {value}
        </NavLink>
      ) : null;
    } else {
      value = record[fieldName];
      if (typeof value === `object`) return null
      title = fieldName;
    }
    return (
      <li className="module-list__field" key={index}>
        <span className="module-list__field-title">{title}:</span>
        <span className="module-list__field-value">{value}</span>
      </li>
    );
  };

  return (
    <div className="module-list__element">
      <h2 className="module-list__element-title">
        <NavLink to={id}>{record[title]}</NavLink>
      </h2>
      <ul className="module-list__element-attibutes">
        {fields.map((fieldName, index) => fieldRender(fieldName, index))}
      </ul>
    </div>
  );
};

export default ListRecord;
