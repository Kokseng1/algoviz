import React from "react";
import "./navbar.css";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="mainnav">
        <FaBars className="bars" />

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
