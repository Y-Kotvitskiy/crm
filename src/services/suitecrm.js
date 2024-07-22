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

  getLitsUrl: (module = `Accounts`) =>
    URL + `/V8/module/` + module + `?sort=name`,

  getRecordUrl: (module, id) => URL + `/V8/module/${module}/${id}`,

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
};

export { crm };
