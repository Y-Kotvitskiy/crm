const Record = ({ record, fields : fieldsProps, title = `name` }) => {
  const fields = (fieldsProps) ? fieldsProps : Object.keys(record);

  return (
    <div className="module-list__element">
      <h2 className="module-list__element-title">{record[title]}</h2>
      <ul className="module-list__element-attibutes">
        {fields.map((fieldName, index) => {
          let value = record[fieldName];
          return typeof value !== "object" && value ? (
            <li className="module-list__field" key={index}>
              <span className="module-list__field-title">{fieldName}:</span>
              <span className="module-list__field-value">{value}</span>
            </li>
          ) : null;
        })}
      </ul>
    </div>
  );
};

export default Record;
