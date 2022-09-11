import React from "react";
import Button from "./Button";

const Header = ({ title,toggleForm,formDisplayed }) => {

  return (
    <header className="header">
      <h1 style={{color:"cyan"}}>{title}</h1>
      <Button btnLabel={formDisplayed ? "Close" : "Add"} color={formDisplayed ? "violet" : 'cyan'} toggleForm={toggleForm} />
    </header>
  );
};

//CSS in JS
const headingStyle = {
  color: "red",
  backgroundColor: "black",
};

export default Header;
