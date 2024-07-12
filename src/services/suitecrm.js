// const URL = "http://167.99.40.116/Api",
//   client_id = `c78a4ae5-8e32-4ef0-5373-6690f4e2c9e5`,
//   client_secret = `test_api2`;

const URL = "http://crm14.wsl/Api",
  client_id = `4fe90608-5ddd-7e06-1306-668d02867b9e`,
  client_secret = `test`;

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
};

export { crm };
