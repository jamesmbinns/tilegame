// Libraries
import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Home from "react/pages/Home.js";

const Main = () => (
  <div className="appBody">
    <Routes>
      <Route exact path="/" element={<Home />} />
    </Routes>
  </div>
);

export default Main;
