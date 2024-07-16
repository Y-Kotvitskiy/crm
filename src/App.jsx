import { useEffect,useState } from "react";
import { crm } from "./services/suitecrm";
import "./App.css";
import Modules from "./Modules/Modules";
import List from "./Modules/List/List";
import { modulesCollection, moduleList, detailView } from "./constants/crm";
import DetailView from "./Modules/DetailView/DetailView";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home/Home";

function App() {
  const [modules, setModules] = useState({});
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

    const getRecord = async () => {
      const crmRecord = await crm.getRecod(
        `Accounts`,
        `bfeab140-2cb9-ab87-bf19-6692b2463ea2`
      );
      setRecord(crmRecord);
    };

    getModules();
    getRecord();
  }, []);

  return (
    <Router>
      <Modules modules={modules} modulesCollection={modulesCollection} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Modules/:name" element={<List />} />
      </Routes>
    </Router>
    //   <>
    //   <List list={list} fields={moduleList.Accounts.fields} />
    //   {record ? <DetailView record={record} fields={detailView.Accounts.fields} /> : null}
    // </>
  );
}

export default App;
