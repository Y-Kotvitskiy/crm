import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { crm } from "./../services/suitecrm";
import { modulesCollection, defaultModules } from "../constants/crm";
import { AuthContext } from "../App";

export default function Modules() {
  const [modules, setModules] = useState({});
  const [titles, setTitles] = useState([]);
  const { user, setAuth } = useContext(AuthContext);

  const getTitles = (modules) =>
    Object.keys(modules).filter(
      (title) => user || defaultModules.includes(title)
    );

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
      setTitles(getTitles(modules));
    };

    getModules();
  }, []);

  useEffect(() => {
    setTitles(getTitles(modules));
  }, [user]);

  const showProperties = (moduleKey) => {
    const moduleTitle = modules[moduleKey].label
      ? modules[moduleKey].label
      : moduleKey;
    return <span> {moduleTitle}</span>;
  };

  const exitHandler = () => setAuth(null);

  return (
    <nav>
      <ul className="modules-menu">
        <li key="home">
          <NavLink to="/">Home</NavLink>
        </li>
        {titles.map((moduleKey, index) => (
          <li key={index}>
            <NavLink to={"/Modules/" + moduleKey}>
              {showProperties(moduleKey)}
            </NavLink>
          </li>
        ))}
        <li key="login" className="modules-menu__login">
          {user ? (
            <>
              {`Hi, ` + user} <button className="modules-menu__exit" onClick = {exitHandler}>Χ</button>
            </>
          ) : (
            <NavLink to="/Login">Login</NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}
