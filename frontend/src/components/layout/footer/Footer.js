import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import googlePlayLogo from "../../../assets/play-store.png";
import iosStoreLogo from "../../../assets/app-store.png";

const Footer = () => {
  return (
    <div className="footer-container">
      <h4>Designed & Developed By - Siddhartha Kumar</h4>
      <div className="download-links">
        <h5>Download Our Application</h5>
        <Link to="/">
          <img src={googlePlayLogo} alt="google play store" />
        </Link>
        <Link to="/">
          <img src={iosStoreLogo} alt="google play store" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
