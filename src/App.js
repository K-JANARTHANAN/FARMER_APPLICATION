import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Crops from "./pages/Crops";
import Fertilizer from "./pages/Fertilizer";
import Irrigation from "./pages/Irrigation";
import MapComponent2 from "./mmm/MapComponent2"; 
import App2 from "./mmm/App2"; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<App2/>} />
        <Route path="/crops" element={<Crops />} />
        <Route path="/fertilizer" element={<Fertilizer />} />
        <Route path="/irrigation" element={<Irrigation />} />  {/* New Route */}
      </Routes>
    </Router>
  );
}

export default App;


