import { useState, createContext, useEffect } from "react";
import "./App.css";
import Modules from "./Modules/Modules";
import List from "./Modules/List/List";
import DetailView from "./Modules/DetailView/DetailView";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";

export const AuthContext = createContext();
 
function App() {
  const [user , setAuth ] = useState(null);

  return (
    <Router>
      <AuthContext.Provider value={{user , setAuth}}>
        <Modules />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route
            path="Modules/:module/:id"
            element={<DetailView schrink={false} />}
          />
          <Route path="Modules/:name" element={<List />} />
        </Routes>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
