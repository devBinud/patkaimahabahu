import { Link } from 'react-router-dom'
import {
  FaFacebookF,
  FaXTwitter,
  FaYoutube,
  FaInstagram,
  FaEnvelope,
  FaPhone
} from 'react-icons/fa6'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="rsb-footer-wrapper">
      {/* Main Dark Footer */}
      <div className="footer-main-dark">
        <div className="footer-grid-container">
          {/* Column 1: Brand Info */}
          <div className="footer-col brand-col">
            <span className="footer-assamese-tag">পাটকাই মহাবাহু ফাউণ্ডেচন</span>
            <h3 className="footer-brand-title">Patkai Mahabahu Foundation</h3>
            <p className="footer-brand-desc">
              A premier national organisation dedicated to the service of flood-affected and underprivileged communities through healthcare, emergency relief, clean water, and rehabilitation across Assam.
            </p>
            <div className="footer-social-icons">
              <a href="#facebook" aria-label="Facebook" className="social-icon-btn"><FaFacebookF /></a>
              <a href="#twitter" aria-label="Twitter" className="social-icon-btn"><FaXTwitter /></a>
              <a href="#youtube" aria-label="YouTube" className="social-icon-btn"><FaYoutube /></a>
              <a href="#instagram" aria-label="Instagram" className="social-icon-btn"><FaInstagram /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col links-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links-list">
              <li><Link to="/about">About PMF</Link></li>
              <li><Link to="/objectives">Objective of Foundation</Link></li>
              <li><Link to="/specialties">Our Focus Areas</Link></li>
              <li><Link to="/contribution">Donate & Support</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div className="footer-col programs-col">
            <h4 className="footer-col-title">Programs</h4>
            <ul className="footer-links-list">
              <li><Link to="/contribution">Emergency Food & Ration</Link></li>
              <li><Link to="/contribution">Clean Water & Hygiene</Link></li>
              <li><Link to="/contribution">Emergency Shelters</Link></li>
              <li><Link to="/contribution">Rebuilding Homes</Link></li>
              <li><Link to="/contribution">Disaster Management</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="footer-col contact-col">
            <h4 className="footer-col-title">Contact Us</h4>
            <div className="contact-block">
              <span className="contact-office-label">REGISTERED OFFICE</span>
              <p className="contact-address-text">
                House Name: Deochora, Nearby Lane 10, Chandan Nagar Club Road, Assam, 781001
              </p>
              <p className="contact-detail-line">
                <FaPhone className="contact-line-icon" />
                <span>+91 7002808115</span>
              </p>
              <p className="contact-detail-line">
                <FaEnvelope className="contact-line-icon" />
                <a href="mailto:patkaimahabahufoundation@gmail.com">patkaimahabahufoundation@gmail.com</a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-container">
            <p className="copyright-text">
              © {new Date().getFullYear()} Patkai Mahabahu Foundation. All Rights Reserved.
              <span className="policy-divider" style={{ margin: '0 0.5rem' }}>|</span>
              Designed & Developed by <a href="https://www.binudsoftwaresolutions.in/" target="_blank" rel="noopener noreferrer" className="developer-link">Binud Software Solutions</a>
            </p>
            <div className="footer-policy-links">
              <Link to="/contact">Privacy Policy</Link>
              <span className="policy-divider">|</span>
              <Link to="/contact">Terms & Conditions</Link>
              <span className="policy-divider">|</span>
              <Link to="/contact">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
