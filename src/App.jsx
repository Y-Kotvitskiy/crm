import { useEffect } from "react";
import { crm } from "./services/suitecrm";
import "./App.css";
import Modules from "./Midules/Modules";
import { useState } from "react";

function App() {


  const [modules, setModules] = useState({})

  const getModules = async () => {
      const modules = await crm.getModules()
      setModules(modules)
  }

  useEffect( () => {
    getModules()
    }, []);

  return <> <Modules modules={modules}/></>;
}

export default App;
