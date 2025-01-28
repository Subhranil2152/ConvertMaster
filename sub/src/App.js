import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
// import ComparisonPage from "./components/ComparisonPage";
import ProductSelection from "./components/ProductSelection";
// import Graph from "./components/Graph"; // Assuming you will create a Graph component
import GraphGenerator from "./components/GraphGenerator";

import "./App.css";
import InstrumentSelection from "./components/InstrumentSelection";
import LabXPage from "./components/LabXPage";
 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product-selection" element={<ProductSelection />} />
        <Route path="/instrument-selection" element={<InstrumentSelection />} />
        {/* <Route path="/graph" element={<Graph />} /> */}
        <Route path="/graph-generator" element={<GraphGenerator/>} />
      
        <Route path="/Lab X Instruments" element={<LabXPage/>} />
        {/* <Route path="/compare" element={<ComparisonPage />} /> */}
      </Routes>
    </Router>
  );
}
 
export default App;