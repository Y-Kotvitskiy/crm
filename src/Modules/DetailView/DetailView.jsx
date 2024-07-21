import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { detailView } from "./../../constants/crm";
import { crm } from "./../../services/suitecrm";
import ModuleField from "../ModuleField/ModuleField";
import { AuthContext } from "../../App";
import { defaultModules } from "./../../constants/crm";

const DetailView = () => {
  const { module, id } = useParams();
  const { data: record, isLoadint, error } = crm.useFetchRecord(module, id );  

  const [{ fields, images, attributes }, setFields]
    = useState({ fields: [], images: [], attributes: [] });
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (record) {
      setFields(() => {
        let fields = [],
          images = [],
          attributes = [];

        if (detailView[module] && detailView[module].fields) {
          fields = detailView[module].fields;
          images = fields.filter(field => (typeof field === `object` && field.type === `image`));
          attributes = fields.filter(field => (typeof field != `object` || field.type !== `image`));
        } else {
          fields = Object.keys(record.attributes)
        }
        return { fields, images, attributes };
      }
      );
    }
  }, [record]);

  useEffect(() => {
    if (!user && !defaultModules.includes(module)) {
      navigate(`/Login`);
    }
  }, [user]);


  const title =
    detailView[module] && detailView[module].title
      ? detailView[module].title
      : detailView.defaultTitle;

  if (isLoadint) {
    return <p>{module} record data is loading ..</p>; 
  }

  if (error) {
    console.error(error);
    return <p> Failed fetch modules .. </p>
  }  

  return record && fields.length > 0 ? (
    <section className="detailview">
      <h2 className="detailview__title">
        <span className="detailview__module_title">{record.type}: </span>
        <span className="detailview__record_name">
          {record.attributes[title]}
        </span>
      </h2>
      {images.length > 0 ?
        <div className="detailview__images">
          {images.map((title) => (
            <ModuleField
              key={typeof title === `object` ? title.name : title}
              title={title}
              record={record.attributes}
            />

          ))}
        </div> : null}
      {attributes.length > 0
        ? (
          <ul className="detailview__attibutes">
            {attributes.map((title) => (
              <ModuleField
                key={typeof title === `object` ? title.name : title}
                title={title}
                record={record.attributes}
                schrink={false}
              />
            ))}
          </ul>)
        : 0}
      {images.length > 0 ?
        <div className="detailview__buttons"></div> : null
      }

    </section>
  ) : (
    "Loading"
  );
};

export default DetailView;
