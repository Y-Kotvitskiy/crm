import { useEffect } from "react";
import { crm } from "../services/suitecrm";
import useFetchData from "./useFetchData";
import { idb } from "../App";

const storeToDb = async (module, data) => {
  const records = [];
  let maxDateModified = ``;
  if (Array.isArray(data) && data.length > 0) {
    data.forEach((record) => {
      const attributes = record.attributes;
      attributes.id = record.id;
      console.log(
        `record.date_entered`,
        record.attributes.date_entered,
        maxDateModified
      );
      if (maxDateModified < record.attributes.date_entered) {
        maxDateModified = record.attributes.date_entered;
      }
      records.push(attributes);
    });
    idb.addRecords(module, records);
    const recordList = await idb.getAllList(module);
    console.log(`list`, recordList);

    idb.storeDateModified(module, maxDateModified);
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
