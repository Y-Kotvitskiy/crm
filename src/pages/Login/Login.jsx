import { AuthContext } from "../../App";
import { useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultModules } from "../../constants/crm";

const Login = () => {
  const { setAuth } = useContext(AuthContext),
    navigate = useNavigate(),
    inputRef = useRef(null),
    [disabled, setDisabled] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (disabled) return;
    setAuth(() => {
      const user = inputRef.current.value;
      return user;
    });
    navigate(`/Modules/` + defaultModules[0]);
  };

  const handleInput = () => {
    setDisabled(inputRef.current.value.length < 4);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <fieldset>
        <label>
          Enter login name
          <input ref={inputRef} onChange={handleInput} placeholder="login" />
        </label>
        <button disabled={disabled}>Login</button>
      </fieldset>
    </form>
  );
};

export default Login;
