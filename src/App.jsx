import { useEffect } from "react";
import { crm } from "./services/suitecrm";
import "./App.css";
import Modules from "./Modules/Modules";
import List from "./Modules/List/List";
import { modulesCollection, moduleList } from "./constants/crm";

import { useState } from "react";

function App() {
  const [modules, setModules] = useState({});
  const [list, setList] = useState([]);

  useEffect(() => {
    const getModules = async () => {
      const crmModules = await crm.getModules();
      const modules = {}
      modulesCollection.forEach ( (moduleName) => {
        if (crmModules[moduleName]) modules[moduleName] =crmModules[moduleName]
      })
      setModules(modules);
    };

    const getList = async () => {
      const list = await crm.getList();
      setList(list);
    };

    getModules();
    getList();
  }, []);

  return (
    <>
      <Modules modules={modules} modulesCollection = {modulesCollection} />
      <List list={list} fields = {moduleList.Accounts.listFields}/>
    </>
  );
}

export default App;
