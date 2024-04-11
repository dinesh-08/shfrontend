import React from 'react';
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Hotel_Entrance from "./Images/Hotel_Entrance.jpg";

function Main() {
  const mainContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: `url(${Hotel_Entrance})`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    padding: "20px",
  };

  const mainTitleStyle = {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#FFFFFF", // White color for header text
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
  };

  const mainLinkStyle = {
    padding: "12px 24px",
    margin: "10px",
    border: "2px solid #ffffff",
    borderRadius: "5px",
    fontSize: "18px",
    fontWeight: "bold",
    textDecoration: "none",
    color: "#ffffff",
    transition: "all 0.3s ease",
    background: "#454545",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const mainLinksStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };


  return (
    <div className="container-fluid" style={mainContainerStyle}>
      <h1 className="display-4" style={mainTitleStyle}>
        Shambala Hotel Reservations
      </h1>
      <div style={mainLinksStyle}>

        <Link
          to="/login"
          className="btn btn-primary btn-lg mb-3"
          style={mainLinkStyle}
        >
          Login
        </Link>
        </div>
    </div>
  );
}

export default Main;