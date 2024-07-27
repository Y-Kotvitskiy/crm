import { useCallback, useMemo } from "react";
import { detailView, defaultModules } from "../constants/crm";
import { AuthContext } from "../App";
import useFetchRecord from "./useFetchRecord";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

const useDetailView = (recordModule = null) => {
  const { module, id } = useParams();
  const {
    data: record,
    isLoadint,
    error,
  } = useFetchRecord(recordModule ? recordModule : module, id);

  const [{ fields, images, attributes }, setFields] = useState({
    fields: [],
    images: [],
    attributes: [],
  });
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
          images = fields.filter(
            (field) => typeof field === `object` && field.type === `image`
          );
          attributes = fields.filter(
            (field) => typeof field != `object` || field.type !== `image`
          );
        } else {
          fields = Object.keys(record.attributes);
        }
        return { fields, images, attributes };
      });
    }
  }, [record]);

  const title = useCallback(() => {
    return detailView[module] && detailView[module].title
      ? detailView[module].title
      : detailView.defaultTitle;
  }, [module]);

  useEffect(() => {
    if (!user && !defaultModules.includes(module)) {
      navigate(`/Login`);
    }
  }, [user]);

  return {
    module,
    title,
    record,
    fields,
    images,
    attributes,
    isLoadint,
    error,
  };
};

export default useDetailView;
