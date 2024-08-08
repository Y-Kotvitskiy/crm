import { useState, useEffect, useCallback } from "react";
import { idb } from "../App";

const useFetchStoredRecord = (module, id) => {
  const [data, setData] = useState(null);
  const [isLoadint, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await idb.getRecord(module, id);
      setData(() => ({type:module, id: data.id,  attributes:data}));
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [module]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, isLoadint, error, getData };
};

export default useFetchStoredRecord;
