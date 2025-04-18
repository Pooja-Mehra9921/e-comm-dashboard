import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

const Header = () => {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <header className="nav-container">
      <div className="logo">🛒 E-Shop</div>

      {auth ? (
        <ul className="nav-ul">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/add">Add Product</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/signup" onClick={handleLogout}>Logout ({auth?.data?.name})</Link></li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li><Link to="/signup">Sign up</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      )}
    </header>
  );
};

export default Header;
