import { useContext, useEffect, useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import useFetchModules from "../../hooks/useFetchModules";
import { modulesCollection, defaultModules } from "../../constants/crm";
import { AuthContext } from "../../App";
import { useSelector } from "react-redux";
import "./Modules.css";

export default function Modules() {
  const { data: modules, isLoadint, error } = useFetchModules();

  const [titles, setTitles] = useState([]);
  const { user, setAuth } = useContext(AuthContext);

  const getTitles = useCallback((modules) => {
    if (!modules) return [];
    const moduleTitles = Object.keys(modules.attributes);
    return modulesCollection
      .filter((elem) => moduleTitles.includes(elem))
      .filter((title) => user || defaultModules.includes(title));
  });

  const cardItem = useSelector((state) => state.productCart.totalCount);

  useEffect(() => {
    setTitles(getTitles(modules));
  }, [modules]);

  useEffect(() => {
    setTitles(getTitles(modules));
  }, [user]);

  const exitHandler = () => setAuth(null);
  if (isLoadint) {
    return <p>Modules is loading ..</p>;
  }
  if (error) {
    console.error(error);
    return <p> Failed fetch modules .. </p>;
  }

  return (
    <nav>
      <ul className="modules-menu">
        <li key="home">
          <NavLink to="/">Home</NavLink>
        </li>
        {titles.map((moduleKey, index) => (
          <li key={index}>
            <NavLink to={"/Modules/" + moduleKey}>
              {modules.attributes[moduleKey].label}
            </NavLink>
          </li>
        ))}
        <li key="login" className="modules-menu__login">
          {user ? (
            <>
              {`Hi, ` + user}{" "}
              <button className="modules-menu__exit" onClick={exitHandler}>
                Χ
              </button>
            </>
          ) : (
            <NavLink to="/Login">Login</NavLink>
          )}
        </li>
        <li className="modules-menu__card">
          {cardItem ? (
            <NavLink to="/Cart">
              🛒<span className="modules-menu__card_link">{cardItem}</span>
            </NavLink>
          ) : null}
        </li>
      </ul>
    </nav>
  );
}
