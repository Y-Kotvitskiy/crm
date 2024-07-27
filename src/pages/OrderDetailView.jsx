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

    return record && fields.length > 0 ? (
        <section className="detailview">
          <h2 className="detailview__title">
            <span className="detailview__module_title">{record.type}: </span>
            <span className="detailview__record_name">
              {record.attributes[title]}
            </span>
          </h2>
          {images.length > 0 ? (
            <div className="detailview__images">
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
            <ul className="detailview__attibutes">
              {attributes.map((title) => (
                <ModuleField
                  key={typeof title === `object` ? title.name : title}
                  title={title}
                  record={record.attributes}
                  schrink={schrink}
                />
              ))}
            </ul>
          ) : (
            0
          )}
          {images.length > 0 ? <div className="detailview__buttons"></div> : null}
        </section>
      ) : (
        "Loading"
      );
    
}

export default OrderDetailView