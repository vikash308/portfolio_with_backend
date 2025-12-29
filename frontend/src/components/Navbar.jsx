import React from "react";
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="nav">
        <h3>Vikash</h3>
      <ul>

        <li className="navBtn">
          <a href="/">Home</a>
        </li>

        <li className="navBtn">
          <a href="#project">Projects</a>
        </li>

        <li className="navBtn">
          <a href="#contact">Contact</a>
        </li>

        <li className="navBtn">
          <Link to="/login">Edit</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
