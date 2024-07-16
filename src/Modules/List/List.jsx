import Record from "./Record/Record";
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
    getList();
  }, [name]);

  console.log(name);

  const fields = moduleList[name].fields;
  if (list.length === 0) return null;

  return (
    <ul className="module-list">
      {list.map((elem) => (
        <li key={elem.id}>
          <Record record={elem.attributes} fields={fields} />
        </li>
      ))}
    </ul>
  );
}
