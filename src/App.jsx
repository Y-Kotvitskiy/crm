import { useState, createContext, useEffect } from "react";
import "./App.css";
import Modules from "./components/Modules/Modules";
import List from "./components/List/List";
import DetailView from "./components/DetailView/DetailView";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { ProductCardProvider } from "./contexts/ProductCardContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Cart from "./pages/Cart/Cart";
import NewOrder from "./pages/NewOrder/NewOrder"; 
import OrderDetailView from "./pages/OrderDetailView";
export const AuthContext = createContext();

function App() {
  const [user, setAuth] = useState(null);

  return (
    <Router>
      <Provider store={store}>
        <AuthContext.Provider value={{ user, setAuth }}>
          <Modules />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Modules/AOS_Invoices/New" element={<NewOrder />} />
            <Route
              path="Modules/AOS_Invoices/:id"
              element={<OrderDetailView schrink={false} />}
            />
            <Route
              path="Modules/:module/:id"
              element={<DetailView schrink={false} />}
            />
            <Route path="Modules/:name" element={<List />} />
          </Routes>
        </AuthContext.Provider>
      </Provider>
    </Router>
  );
}

export default App;
