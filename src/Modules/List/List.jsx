import Record from "./Record/Record";

export default function List({ list = [] }) {

  const attributeRender = (attributes, name = `name`) => {
    const title = attributes[name];
    return (
      <div className="module-list__element">
        <p className="module-list__element-title">Record: {title}</p>
        <ul className="module-list__element-attibutes">
          {Object.keys(attributes).map((fieldName, index) => {
            let value = attributes[fieldName];
            return typeof value !== "object" && value ? (
              <li className="module-list__field" key={index}>
                <span className="module-list__field-title">{fieldName}</span>:
                <span className="module-list__field-value">{value}</span>
              </li>
            ) : null;
          })}
        </ul>
      </div>
    );
  };

  if (list.length === 0) return null;

  return (
    <ul className="module-list">
      {list.map((elem) => (
        <li key={elem.id}> <Record record={elem.attributes}/></li>
      ))}
    </ul>
  );
}
