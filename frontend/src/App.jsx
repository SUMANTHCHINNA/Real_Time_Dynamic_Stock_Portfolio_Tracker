import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import MyStocks from "../pages/MyStocks"; // Make sure this page exists
import StockPrices from "../pages/StockPrices"; // Make sure this page exists
import AddStock from "../pages/AddStock"; // Import AddStock page
import Login from "../pages/login";
import Register from "../pages/register";
import Sidebar from "../pages/Sidebar";
import "./App.css";

const App = () => {

  let [getToken, setToken] = useState('');

  useEffect(() => {
    let token = localStorage.getItem("token");
    setToken(token ? token : "")
  }, [getToken, setToken])



  if (getToken.length > 0) {
    return (
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={[<Sidebar />, <Dashboard token={getToken} />]} />
            <Route path="/mystocks" element={[<Sidebar />, <MyStocks token={getToken} />]} />
            <Route path="/stockprices" element={[<Sidebar />, <StockPrices token={getToken} />]} />
            <Route path="/add-stock" element={[<Sidebar />, <AddStock token={getToken} />]} />
            <Route path="*" element={<h1>Page Not Found</h1>} />
          </Routes>
        </div>
      </Router>
    );
  } else {
    return (
      <Router>
        <div className="app">
          <Routes>
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register setToken={setToken} />} />
            <Route path="*" element={
              <>
                <Link to={"../login"}>login</Link>
                <Link to={"../register"}>register</Link>
                <h1>Page Not Found</h1>
              </>
            } />
          </Routes>
        </div>
      </Router>
    );
  }
};

export default App;
