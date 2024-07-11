import { useState, useEffect } from "react";
import { token } from "./services/suitecrm";
import "./App.css";

function App() {

  const getModuleData = async () => {
    let url = 'http://crm14.wsl/Api/V8/module/Accounts?fields[Account]=name,account_type&page[number]=3&page[size]=20';
     url = 'http://crm14.wsl/Api/V8/meta/modules';
    const result = await fetch(url, {
      headers: {
        "Content-Type" : "application/json",
        "Authorization": "Bearer " + token.access_token
      }
    })
    .then( response => response.json())
    .then( result => {
      console.log('modules', result.data)
    })
    .catch( err => console.log(err) )
  }

  useEffect( () => {
      token.get()
      .then ( () =>  {
          getModuleData();
      }
    );
      //
    }, []);

  return <> App </>;
}

export default App;
