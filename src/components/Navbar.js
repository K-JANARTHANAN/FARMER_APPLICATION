import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import external CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="title">Farmer Website</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/crops">Crops</Link></li>
        <li><Link to="/fertilizer">Fertilizer</Link></li>
        <li><Link to="/irrigation">Irrigation</Link></li> {/* New Link */}
      </ul>
    </nav>
  );
};

export default Navbar;

