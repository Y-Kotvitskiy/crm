import { NavLink } from "react-router-dom";
import ModuleField from "../../ModuleField/ModuleField";

const ListRecord = ({ id, record, fields: fieldsProps, title = `name` }) => {

  const fields = fieldsProps ? fieldsProps : Object.keys(record),
    images = fields.filter(field => (typeof field === `object` && field.type === `image`)),
    attributes = fields.filter(field => (typeof field != `object` || field.type !== `image`));

  return (
    <div className="module-list__element">
      <h2 className="module-list__element-title">
        <NavLink to={id}>{record[title]}</NavLink>
      </h2>
      <div className="module-list__record">

        {images.length > 0 ?
          <div className="module-list__images">
            {images.map((title) => (
              <ModuleField
                key={typeof title === `object` ? title.name : title}
                title={title}
                record={record}
              />

            ))}
          </div> : null}
        <ul className="module-list__element-attibutes">
          {attributes.map((title) => (
            <ModuleField
              key={typeof title === `object` ? title.name : title}
              title={title}
              record={record}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListRecord;
