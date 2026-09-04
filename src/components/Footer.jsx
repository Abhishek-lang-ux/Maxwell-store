import { Mail, MapPin, Globe2 } from "lucide-react";

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo-wrap">
            <img src="/maxwell-logo.png" alt="Maxwell" />
          </div>
          <p>
            Maxwell Appliances is presented in the 2025–26 catalogue as a quality-focused
            manufacturer and supplier of Home Appliances, Fans and Heating Products.
          </p>
          <div className="footer-contact">
            <span><MapPin size={15} /> Plot No. 28/1, Sector-94, Greater Faridabad - 121002</span>
            <span><Mail size={15} /> info@maxwellgroup.in</span>
            <span><Globe2 size={15} /> www.maxwellgroup.in</span>
          </div>
        </div>

        <div className="footer-column">
          <h4>Product Range</h4>
          <a href="#categories">Cooktops</a>
          <a href="#categories">Mixer Grinders</a>
          <a href="#categories">Electric Kettles</a>
          <a href="#categories">Pressure Cookers</a>
          <a href="#categories">Fans</a>
        </div>

        <div className="footer-column">
          <h4>Home Appliances</h4>
          <a href="#categories">Electric Chimneys</a>
          <a href="#categories">Heaters</a>
          <a href="#categories">Electric Iron</a>
          <a href="#categories">Water Heaters</a>
          <a href="#categories">Induction / Infrared</a>
        </div>

        <div className="footer-column">
          <h4>Maxwell</h4>
          <a href="#about">Company Profile</a>
          <a href="#products">2025–26 Catalogue</a>
          <a href="#contact">Contact</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Maxwell Home Appliances. All Rights Reserved.</span>
        <span>Designed around the Maxwell 2025–26 product catalogue.</span>
      </div>
    </footer>
  );
}

export default Footer;
