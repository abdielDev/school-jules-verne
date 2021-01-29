import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, } from "react-icons/fa";
import '../styles/components/Footer.scss';

const Footer = () => {
  return (
    <footer className="App-footer">
      <div className="wrapped">
        <div className="footer-info">
          <a href="/">Copyright 2020 All rights reserved</a>
          <a href="/">FAQ</a>
          <a href="/">Privacy Policy</a>
          <a href="/">Terms of use</a>
        </div>
        <div className="footer-social">
          <a className="footer-social-instagram" href="/"><FaInstagram /></a>
          <a className="footer-social-facebook" href="/"><FaFacebookF /></a>
          <a className="footer-social-twitter" href="/"><FaTwitter /></a>
          <a className="footer-social-youtube" href="/"><FaYoutube /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;