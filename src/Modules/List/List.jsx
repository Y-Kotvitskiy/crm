import Record from "./Record/Record";

export default function List({ list = [], fields }) {

  if (list.length === 0) return null;

  return (
    <ul className="module-list">
      {list.map((elem) => (
        <li key={elem.id}> <Record record={elem.attributes} fields = {fields}/></li>
      ))}
    </ul>
  );
}
