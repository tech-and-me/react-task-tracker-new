import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <p>Copyright &copy; 2022 by : </p>
      <p style={{ color: "violet", fontStyle: "italic" }}> Tech and Me </p>
      <Link to="/about">About</Link>
    </footer>
  );
};

export default Footer;
