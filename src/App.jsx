import { useEffect } from "react";
import { crm } from "./services/suitecrm";
import "./App.css";
import Modules from "./Modules/Modules";
import List from "./Modules/List/List";
import { modulesCollection, moduleList, detailView } from "./constants/crm";
import DetailView from "./Modules/DetailView/DetailView";

import { useState } from "react";

function App() {
  const [modules, setModules] = useState({});
  const [list, setList] = useState([]);
  const [record, setRecord] = useState(null);

  useEffect(() => {
    const getModules = async () => {
      const crmModules = await crm.getModules();
      const modules = {};
      modulesCollection.forEach((moduleName) => {
        if (crmModules[moduleName])
          modules[moduleName] = crmModules[moduleName];
      });
      setModules(modules);
    };

    const getList = async () => {
      const list = await crm.getList();
      setList(list);
    };

    const getRecord = async () => {
      const crmRecord = await crm.getRecod(
        `Accounts`,
        `bfeab140-2cb9-ab87-bf19-6692b2463ea2`
      );
      setRecord(crmRecord);
    };

    getModules();
    getList();
    getRecord();
  }, []);

  return (
    <>
      <Modules modules={modules} modulesCollection={modulesCollection} />
      <List list={list} fields={moduleList.Accounts.fields} />
      {record ? <DetailView record={record} fields={detailView.Accounts.fields} /> : null}
    </>
  );
}

export default App;
