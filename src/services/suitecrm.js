import { useCallback, useEffect, useState } from "react";

const URL = "http://45.82.177.129:8080/Api",
  //const URL = "https://45.82.177.129:8443/Api",
  client_id = `64f2ab0d-d60f-ab9d-f451-6692662970e0`,
  client_secret = `api_user`;

const crm = {
  access_token: null,

  getToken: async () => {
    if (!crm.access_token) {
      crm.access_token = localStorage.getItem("access_token");
      if (crm.access_token) return;
    }
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
    crm.access_token = result.access_token;
    localStorage.setItem("access_token", crm.access_token);
  },

  updateToken: async () => {
    localStorage.removeItem(`access_token`);
    crm.access_token = null;
    await crm.getToken();
  },

  checkTokenState: async (tokenUpdate) => {
    if (tokenUpdate > 1) {
      throw `Update token error!`;
    }

    if (!crm.access_token) {
      await crm.getToken();
    }

    return ++tokenUpdate;
  },

  createInvoice: async (attributes, tokenUpdate = 0) => {
    tokenUpdate = await crm.checkTokenState(tokenUpdate);

    const request = await fetch(URL + `/V8/module`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + crm.access_token,
      },
      body: JSON.stringify({
        data: {
          type: "AOS_Invoices",
          attributes,
        },
      }),
    });

    if (!request.ok) {
      if (request.status === 401) {
        await crm.updateToken();
        return crm.createInvoice(attributes, tokenUpdate);
      } else {
        throw Error(`Failed to post order`);
      }
    }

    const result = await request.json();
    return result;
  },

  updateInvoice: async (id, attributes) => {
    if (!crm.access_token) {
      await crm.getToken();
    }

    const body = JSON.stringify({
      data: {
        type: "AOS_Invoices",
        id,
        attributes,
      },
    });

    const request = await fetch(URL + `/V8/module`, {
      method: `PATCH`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + crm.access_token,
      },
      body: body,
    });

    if (!request.ok) {
      throw Error(`Failed to patch order`);
    }

    const result = await request.json();
    return result;
  },

  getModulesUrl: () => URL + `/V8/meta/modules`,

  getLitsUrl: (module = `Accounts`, sort = "name") =>
    URL + `/V8/module/` + module + `?sort=` + sort,

  getRecordUrl: (module, id) => URL + `/V8/module/${module}/${id}`,

  fetchData: async (url, tokenUpdate = 0) => {
    tokenUpdate = await crm.checkTokenState(tokenUpdate);

    const request = await fetch(url, {
      method: `GET`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + crm.access_token,
      },
    });
    if (!request.ok) {
      if (request.status === 401) {
        await crm.updateToken();
        return await crm.fetchData(url, tokenUpdate);
      } else {
        throw Error(`Failed to fetch data ` + url);
      }
    }
    const result = await request.json();
    return result.data;
  },
};

export { crm };
