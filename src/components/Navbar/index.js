import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { OptionsButton } from "../AnimatedHamburgerButton/AnimatedHamburgerButton";

const Navbar = () => {
  return (
    <>
      <nav className="mainnav w-screen">
        <div className="options-container">
          <OptionsButton />
        </div>

        <div className="navmenu">
          <Link className="navlink" to="/stack">
            Stack
          </Link>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </div>
        <nav className="NavBtn">
          <Link className="NavBtnLink" to="/stack">
            Placeholder Button
          </Link>
        </nav>
      </nav>
    </>
  );
};

export default Navbar;
