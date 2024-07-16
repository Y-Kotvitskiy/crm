import { NavLink } from "react-router-dom";
export default function Modules({ modules = {} }) {
  const showProperties = (moduleKey) => {
    const moduleTitle = modules[moduleKey].label
      ? modules[moduleKey].label
      : moduleKey;
    return <span> {moduleTitle}</span>;
  };

  return (
    <nav>
      <ul className="modules-menu">
      <li key="home"> <NavLink to="/">Home</NavLink></li>
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
