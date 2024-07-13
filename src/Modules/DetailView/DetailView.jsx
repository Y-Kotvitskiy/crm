const DetailView = ({ record, fields: fieldsProp, title = 'name' }) => {
  const fields = fieldsProp ? fieldsProp : Object.keys(record);

  console.log(record)

  return (
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
  );
};

export default DetailView;
