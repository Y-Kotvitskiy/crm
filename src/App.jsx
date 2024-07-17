import { useEffect,useState } from "react";
import "./App.css";
import Modules from "./Modules/Modules";
import List from "./Modules/List/List";
import { modulesCollection, moduleList, detailView } from "./constants/crm";
import DetailView from "./Modules/DetailView/DetailView";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home/Home";

function App() {
  const [record, setRecord] = useState(null);

  useEffect(() => {

    // const getRecord = async () => {
    //   const crmRecord = await crm.getRecod(
    //     `Accounts`,
    //     `bfeab140-2cb9-ab87-bf19-6692b2463ea2`
    //   );
    //   setRecord(crmRecord);
    // };
  
    // getRecord();

  }, []);

  return (
    <Router>
      <Modules />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Modules/:name/:id" element={<DetailView />} />
        <Route path="Modules/:name" element={<List />} />
      </Routes>
    </Router>
  );
}

export default App;
