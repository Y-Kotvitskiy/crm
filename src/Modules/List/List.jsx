import ListRecord from "./ListRecord/ListRecord";
import { moduleList } from "./../../constants/crm";
import { crm } from "./../../services/suitecrm";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function List() {
  const [list, setList] = useState([]);
  const { name } = useParams();
  useEffect(() => {
    const getList = async () => {
      const list = await crm.getList(name);
      setList(list);
    };
    setList([])
    getList();
  }, [name]);

  if (list.length === 0) return null;
  
  const fields = (moduleList[name] && moduleList[name].fields.length > 0) 
    ? moduleList[name].fields
    : Object.keys(list.attributes)


  return (
    <ul className="module-list">
      {list.map((elem) => (
        <li key={elem.id}>
          <ListRecord id={elem.id} record={elem.attributes} fields={fields} />
        </li>
      ))}
    </ul>
  );
}
