import { useEffect } from "react";
import { crm } from "./services/suitecrm";
import "./App.css";
import Modules from "./Modules/Modules";
import List from "./Modules/List/List";

import { useState } from "react";

function App() {
  const [modules, setModules] = useState({});
  const [list, setList] = useState([]);

  useEffect(() => {
    const getModules = async () => {
      const modules = await crm.getModules();
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
      <Modules modules={modules} />
      <List list={list} />
    </>
  );
}

export default App;
