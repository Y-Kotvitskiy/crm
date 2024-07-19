import { NavLink } from "react-router-dom";
import ModuleField from "../../ModuleField/ModuleField";

const ListRecord = ({ id, record, fields: fieldsProps, title = `name` }) => {
  const fields = fieldsProps ? fieldsProps : Object.keys(record);
  return (
    <div className="module-list__element">
      <h2 className="module-list__element-title">
        <NavLink to={id}>{record[title]}</NavLink>
      </h2>
      <ul className="module-list__element-attibutes">
        {fields.map((title) => (
          <ModuleField
            key={typeof title === `object` ? title.name : title}
            title={title}
            record={record}
          />
        ))}
      </ul>
    </div>
  );
};

export default ListRecord;
