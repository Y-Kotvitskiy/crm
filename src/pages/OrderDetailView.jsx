import useDetailView from "../hooks/useDetailView" 
import ModuleField from "../components/ModuleField/ModuleField";

const OrderDetailView = () => {

    const {
        module,
        title,
        record,
        fields,
        images,
        attributes,
        isLoadint,
        error,
      } = useDetailView('AOS_Invoices');

    if (isLoadint) {
    return <p>{module} record data is loading ..</p>;
    }

    if (error) {
    console.error(error);
    return <p> Failed fetching  record data .. </p>;
    }

    console.log(title, record, fields); 

    return record && fields.length > 0 ? (
        <section className="orderview">
          <h2 className="orderview__title">
            <span className="orderview__module_title">Order #: </span>
            <span className="orderview__record_name">
              {record.attributes[title]}
            </span>
          </h2>
          {images.length > 0 ? (
            <div className="orderview__images">
              {images.map((title) => (
                <ModuleField
                  key={typeof title === `object` ? title.name : title}
                  title={title}
                  record={record.attributes}
                />
              ))}
            </div>
          ) : null}
          {attributes.length > 0 ? (
            <ul className="orderview__attibutes">
              {attributes.map((title) => (
                <ModuleField
                  key={typeof title === `object` ? title.name : title}
                  title={title}
                  record={record.attributes}
                  schrink={false}
                />
              ))}
            </ul>
          ) : (
            0
          )}
          {images.length > 0 ? <div className="orderview__buttons"></div> : null}
        </section>
      ) : (
        "Loading"
      );
    
}

export default OrderDetailView