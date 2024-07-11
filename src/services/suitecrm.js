const URL = "http://crm14.wsl/Api/",
client_id = `4fe90608-5ddd-7e06-1306-668d02867b9e`,
client_secret = `test`


const token = {
//  url: "http://crm14.wsl/Api/index.php/access_token",
  access_token: null,
  get: async () => {
    const request = await fetch(URL + `/access_token`, {
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
    token.access_token = await result.access_token;
  },
};

export { token };
