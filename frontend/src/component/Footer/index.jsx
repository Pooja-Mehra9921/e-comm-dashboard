import React from "react";
import "./style.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <p className="footer-title">🛍️ E-Commerce Dashboard</p>
      <p className="footer-text">© {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  );
};

export default Footer;
