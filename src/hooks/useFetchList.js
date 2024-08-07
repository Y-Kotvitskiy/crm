import { useEffect } from "react";
import { crm } from "../services/suitecrm";
import useFetchData from "./useFetchData";
import { idb } from "../App";

const storeToDb = (module, data) => {
  const records = [];
  if (Array.isArray(data) && data.length > 0) {
    data.forEach((record) => {
      const attributes = record.attributes;
      attributes.id = record.id;
      records.push(attributes);
    });
    idb.addRecords(module, records);
    console.log(`storeToDb`, module, records);
  }
};

const useFetchList = (module, sort) => {
  const result = useFetchData(crm.getLitsUrl(module, sort));
  useEffect(() => {
    if (!result.isLoadint && result.data) storeToDb(module, result.data);
  }, [result.isLoadint]);
  return result;
};

export default useFetchList;
