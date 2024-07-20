import ListRecord from "./ListRecord/ListRecord";
import { moduleList } from "./../../constants/crm";
import { crm } from "./../../services/suitecrm";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function List() {
  const [list, setList] = useState(null);
  const [{fields, buttons}, setFields] = useState({fields:[], buttons: []});
  const { name } = useParams();

  useEffect(() => {
    const getList = async () => {
      const list = await crm.getList(name);
      setList(list);
    };
    getList();
  }, [name]);

  useEffect(() => {
    if (list && list.length > 0) {
      setFields(() => {
        const fields =  moduleList[name] && moduleList[name].fields
          ? moduleList[name].fields
          : Object.keys(list[0].attributes);
          const buttons =  moduleList[name] && moduleList[name].buttons
          ? moduleList[name].buttons
          : [];
          return {fields, buttons}
      });
    }
  }, [list]);

  return !list ? (
    `Data loading`
  ) : list.length > 0 && fields.length > 0 ? (
    <ul className="module-list">
      {list.map((elem) => (
        <li key={elem.id}>
          <ListRecord id={elem.id} record={elem.attributes} fields={fields} buttons = {buttons} module={name} />
        </li>
      ))}
    </ul>
  ) : null;
}
