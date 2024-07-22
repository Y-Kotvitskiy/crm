import { crm } from "../services/suitecrm";
import { useState, useEffect, useCallback } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [isLoadint, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await crm.fetchData(url);
      setData(data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, isLoadint, error, getData };
};

export default useFetchData;
