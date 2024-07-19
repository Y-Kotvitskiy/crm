const URL = "http://zomro.my:8080/Api",
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
    const result = await request.json();
    crm.access_token = await result.access_token;
  },

  getModules: async () => {
    if (!crm.access_token) {
      await crm.getToken();
    }

    const responce = await fetch(URL + `/V8/meta/modules`, {
        method: `GET`,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + crm.access_token,
        },
      }),
      result = await responce.json();
    return result.data.attributes;
  },

  getList: async (module = `Accounts`, sort = '') => {
    if (!crm.access_token) {
      await crm.getToken();
    }

    sort =  (sort) ? '?sort='+sort : `?sort=name`;

    const responce = await fetch(URL + `/V8/module/` + module + sort, {
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

    const url = URL + `/V8/module/${module}/${id}`

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
};

export { crm };
