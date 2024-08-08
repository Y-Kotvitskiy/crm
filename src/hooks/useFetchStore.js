import { useState, useEffect, useCallback } from "react";
import { idb } from "../App";

const useFetchStore = (module) => {
  const [data, setData] = useState(null);
  const [isLoadint, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const recordList = await idb.getAllList(module);
      setData(() => {
        const data = recordList.map((record) => ({ id: record.id, attributes: record }) );
        return data;
      });
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

export default useFetchStore;
