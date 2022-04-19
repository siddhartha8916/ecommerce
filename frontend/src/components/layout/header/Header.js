import React from "react";
import "./Header.css";
import logo from "../../../assets/logo.png";
import { BsSearch } from "react-icons/bs";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="navigation_bar_container">
      <img src={logo} alt="logo" />
      <div className="navigation_bar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
      <div className="navigation_bar_right">
        <Link to="/search">
          <BsSearch />
        </Link>
        <Link to="/profile">
          <FaUser />
        </Link>
        <Link to="/cart">
          <BsFillCartCheckFill />
        </Link>
      </div>
    </div>
  );
};

export default Header;
