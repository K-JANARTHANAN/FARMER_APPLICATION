import React from "react";
import bgimage from "./assets/bgimage4.jpg"; // Ensure the correct path and file extension
 

const Home = () => {
  return (
    <div style={{ ...styles.container, backgroundImage: `url(${bgimage})` }}>
      <h1>Welcome, Farmer!</h1>
      <p>
        This platform provides essential information about crops and fertilizers
        to help farmers make informed decisions.
      </p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    margin:5,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
};

export default Home;
