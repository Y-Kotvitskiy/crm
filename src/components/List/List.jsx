import ListRecord from "./ListRecord/ListRecord";
import { moduleList, defaultModules } from "./../../constants/crm";
import useFetchList from "../../hooks/useFetchList";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";

export default function List() {
  const [{ fields, buttons }, setFields] = useState({
    fields: [],
    buttons: [],
  });
  const { name } = useParams();
  const { user } = useContext(AuthContext);
  const { data: list, isLoadint, error, getData } = useFetchList(name);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !defaultModules.includes(name)) {
      navigate(`/Login`);
    }
  }, [user]);

  useEffect(() => {
    if (list && list.length > 0) {
      setFields(() => {
        const fields =
          moduleList[name] && moduleList[name].fields
            ? moduleList[name].fields
            : Object.keys(list[0].attributes);
        const buttons =
          moduleList[name] && moduleList[name].buttons
            ? moduleList[name].buttons
            : [];
        return { fields, buttons };
      });
    }
  }, [list]);

  if (isLoadint) {
    return <p>{name} is loading ..</p>;
  }

  if (error) {
    console.error(error);
    return <p> Failed fetch modules .. </p>;
  }

  return !list ? (
    `Data loading`
  ) : list.length > 0 && fields.length > 0 ? (
    <>
      <ul className="module-list">
        {list.map((elem) => (
          <li key={elem.id}>
            <ListRecord
              id={elem.id}
              record={elem.attributes}
              fields={fields}
              buttons={buttons}
              module={name}
            />
          </li>
        ))}
      </ul>
      <button onClick={getData}>🗘</button>
    </>
  ) : null;
}
