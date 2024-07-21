import { useCallback, useEffect, useState } from "react";

const URL = "http://45.82.177.129:8080/Api",
  client_id = `64f2ab0d-d60f-ab9d-f451-6692662970e0`,
  client_secret = `api_user`;

const crm = {
  access_token: null,

  getToken: async () => {
    const request = await fetch(URL + `/index.php/access_token`, {
      method: `POST`,
      headers: {
        "Content-Type": `application/vnd.api+json`,
        Accept: `application/vnd.api+json`,
      },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id,
        client_secret,
      }),
    });
    if (!request.ok) {
      throw Error(`Failed get access token`);
    }
    const result = await request.json();
    crm.access_token = await result.access_token;
  },

  getModulesUrl: () => URL + `/V8/meta/modules`,

  getModules: async () => {
    if (!crm.access_token) {
      await crm.getToken();
    }

    const responce = await fetch(crm.getModulesUrl(), {
        method: `GET`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + crm.access_token,
        },
      }),
      result = await responce.json();
    return result.data.attributes;
  },

  getLitsUrl: (module = `Accounts`) =>
    URL + `/V8/module/` + module + `?sort=name`,

  getList: async (module = `Accounts`, sort = "") => {
    if (!crm.access_token) {
      await crm.getToken();
    }

    sort = sort ? "?sort=" + sort : `?sort=name`;

    const responce = await fetch(crm.getLitsUrl(module), {
        method: `GET`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + crm.access_token,
        },
      }),
      result = await responce.json();
    return result.data;
  },

  getRecod: async (module = `Accounts`, id) => {
    if (!crm.access_token) {
      await crm.getToken();
    }

    const url = URL + `/V8/module/${module}/${id}`;

    const responce = await fetch(url, {
        method: `GET`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + crm.access_token,
        },
      }),
      result = await responce.json();
    return result.data;
  },

  fetchData: async (url) => {
    if (!crm.access_token) {
      await crm.getToken();
    }

    const responce = await fetch(url, {
      method: `GET`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + crm.access_token,
      },
    });
    if (!responce.ok) {
      throw Error(`Failed fetch data`);
    }
    const result = await responce.json();
    return result.data;
  },

  useFetchData: (url) => {
    const [data, setData] = useState(null);
    const [isLoadint, setLoading] = useState(false);
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
      },
      [url]
    );

    useEffect(() => {
      getData();
    }, [getData]);

    return { data, isLoadint, error };
  },

  useFetchModules: () => crm.useFetchData(crm.getModulesUrl()),

  useFetchList: (module) => crm.useFetchData(crm.getLitsUrl(module)),
};

export { crm };
