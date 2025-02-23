import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.title}>Farmer Website</h2>
      <ul style={styles.navLinks}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/crops">Crops</Link></li>
        <li><Link to="/fertilizer">Fertilizer</Link></li>
        <li><Link to="/irrigation">Irrigation</Link></li> {/* New Link */}
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    backgroundColor: "#4CAF50",
    color: "white"
  },
  title: {
    margin: "0 20px"
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    marginRight: "20px"
  }
};

export default Navbar;
