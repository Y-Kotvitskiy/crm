import { useEffect,useState } from "react";
import "./App.css";
import Modules from "./Modules/Modules";
import List from "./Modules/List/List";
import DetailView from "./Modules/DetailView/DetailView";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home/Home";

function App() {

  return (
    <Router>
      <Modules />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Modules/:module/:id" element={<DetailView schrink = {false}/>} />
        <Route path="Modules/:name" element={<List />} />
      </Routes>
    </Router>
  );
}

export default App;
