export default function Modules({ modules = {} }) {


  const showProperties = (moduleKey) => {
    const moduleTitle = modules[moduleKey].label
      ? modules[moduleKey].label
      : moduleKey;
    return <span> {moduleTitle}</span> ;
  };

  return (
    <nav>
      <ul className='modules-menu'>
        {Object.keys(modules).map((moduleKey, index) => (
          <li key={index}><a href="#">{showProperties(moduleKey)}</a></li>
        ))}
      </ul>
    </nav>
  );
}
