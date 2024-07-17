import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { crm } from "./../services/suitecrm";
import { modulesCollection } from "../constants/crm";

export default function Modules() {
  const [modules, setModules] = useState({});

  useEffect(() => {
    const getModules = async () => {
      const crmModules = await crm.getModules();
      const modules = {};
      const menuModules =
        modulesCollection.length > 0
          ? modulesCollection
          : Object.keys(crmModules);

      menuModules.forEach((moduleName) => {
        if (crmModules[moduleName])
          modules[moduleName] = crmModules[moduleName];
      });
      setModules(modules);
    };

    getModules();
  }, []);
  const showProperties = (moduleKey) => {
    const moduleTitle = modules[moduleKey].label
      ? modules[moduleKey].label
      : moduleKey;
    return <span> {moduleTitle}</span>;
  };

  return (
    <nav>
      <ul className="modules-menu">
        <li key="home">
          {" "}
          <NavLink to="/">Home</NavLink>
        </li>
        {Object.keys(modules).map((moduleKey, index) => (
          <li key={index}>
            <NavLink to={"/Modules/" + moduleKey}>
              {showProperties(moduleKey)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
