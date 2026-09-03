import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaChevronDown
} from 'react-icons/fa6'
import logoImg from '../../assets/logo.png'
import './Footer.css'

export default function Footer() {
  const [openAccordion, setOpenAccordion] = useState(null)

  const toggleAccordion = (name) => {
    setOpenAccordion((prev) => (prev === name ? null : name))
  }

  return (
    <footer className="rf-footer-wrapper">
      {/* Main Footer Card */}
      <div className="rf-footer-card">
        {/* Desktop 5-Column Grid */}
        <div className="rf-footer-grid rf-desktop-only">
          {/* Column 1: About Us */}
          <div className="rf-footer-col">
            <h4 className="rf-col-heading">About Us</h4>
            <ul className="rf-links-list">
              <li><Link to="/about">Our Founder-Chairman</Link></li>
              <li><Link to="/about">Our Impact & Reach</Link></li>
              <li><Link to="/about">Our Story & Mission</Link></li>
              <li><Link to="/objectives">Objectives of Foundation</Link></li>
              <li><Link to="/specialties">What We Do</Link></li>
              <li><Link to="/philosophy">Philosophy & Ethics</Link></li>
            </ul>

            <div className="rf-sub-links-group">
              <Link to="/contact" className="rf-bold-link">Volunteer With Us</Link>
              <Link to="/contact" className="rf-bold-link">Contact Us</Link>
              <Link to="/appointment" className="rf-bold-link">Emergency Helpline</Link>
            </div>
          </div>

          {/* Column 2: What We Do */}
          <div className="rf-footer-col">
            <h4 className="rf-col-heading">What We Do</h4>
            <ul className="rf-links-list">
              <li><Link to="/contribution">Rural Transformation</Link></li>
              <li><Link to="/contribution">Emergency Food & Ration</Link></li>
              <li><Link to="/contribution">Clean Water & Sanitation</Link></li>
              <li><Link to="/specialties">Healthcare & Medical Relief</Link></li>
              <li><Link to="/contribution">Disaster Management</Link></li>
              <li><Link to="/specialties">Women & Child Support</Link></li>
              <li><Link to="/objectives">Community Empowerment</Link></li>
              <li><Link to="/contribution">Rebuilding Shelter Homes</Link></li>
              <li><Link to="/objectives">Village Self-Reliance</Link></li>
            </ul>
          </div>

          {/* Column 3: Insights & Media */}
          <div className="rf-footer-col">
            <h4 className="rf-col-heading">Insights</h4>
            <ul className="rf-links-list">
              <li><Link to="/ground-report">Ground Relief Reports</Link></li>
              <li><Link to="/about">Stories About Our Work</Link></li>
              <li><Link to="/ground-report">Relief Drive Bulletins</Link></li>
            </ul>

            <h4 className="rf-col-heading rf-heading-spaced">Media</h4>
            <ul className="rf-links-list">
              <li><Link to="/gallery">Ground Photo Gallery</Link></li>
              <li><Link to="/gallery">Press & Media Releases</Link></li>
              <li><Link to="/gallery">Relief Documentaries</Link></li>
              <li><Link to="/ground-report">Live Flood Updates</Link></li>
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div className="rf-footer-col">
            <h4 className="rf-col-heading">Quick Links</h4>
            <ul className="rf-links-list">
              <li><Link to="/contribution">Support Relief Drives</Link></li>
              <li><Link to="/appointment">Request Relief Assistance</Link></li>
              <li><Link to="/contact">Volunteer Registration</Link></li>
              <li><Link to="/contribution">Direct Bank Donation</Link></li>
              <li><Link to="/about">Transparency & Audits</Link></li>
              <li>
                <a
                  href="https://flood-relief.pages.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Relief Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Brand Logo, Contact Address & Socials */}
          <div className="rf-footer-col rf-brand-col">
            <Link to="/" className="rf-brand-block" aria-label="Patkai Mahabahu Foundation Home">
              <img src={logoImg} alt="Patkai Mahabahu Foundation Logo" className="rf-brand-logo" />
              <div className="rf-brand-text">
                <span className="rf-brand-assamese">পাটকাই মহাবাহু ফাউণ্ডেচন</span>
                <span className="rf-brand-english">Patkai Mahabahu Foundation</span>
              </div>
            </Link>

            <div className="rf-address-block">
              <h5 className="rf-address-title">Contact Address</h5>
              <p className="rf-address-text">
                <strong>Patkai Mahabahu Foundation:</strong> Deochora, Nearby Lane 10, Chandan Nagar Club Road, Assam, 781001
              </p>
              <p className="rf-contact-direct">
                <a href="mailto:patkaimahabahufoundation@gmail.com" className="rf-contact-link">
                  patkaimahabahufoundation@gmail.com
                </a>
                <span className="rf-contact-sep">|</span>
                <a href="tel:7002808115" className="rf-contact-link">
                  +91 70028 08115
                </a>
              </p>
            </div>

            {/* Social Circle Buttons */}
            <div className="rf-social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rf-social-btn">
                <FaFacebookF size={14} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter X" className="rf-social-btn">
                <FaXTwitter size={14} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rf-social-btn">
                <FaLinkedinIn size={14} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rf-social-btn">
                <FaInstagram size={14} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="rf-social-btn">
                <FaYoutube size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Accordion View (Exact Reliance Foundation Mobile Pattern) */}
        <div className="rf-mobile-accordion-container rf-mobile-only">
          {/* 1. About Us */}
          <div className="rf-accordion-item">
            <button
              type="button"
              className="rf-accordion-header"
              onClick={() => toggleAccordion('about')}
              aria-expanded={openAccordion === 'about'}
            >
              <span>About Us</span>
              <FaChevronDown className={`rf-accordion-chevron ${openAccordion === 'about' ? 'open' : ''}`} />
            </button>
            <div className={`rf-accordion-collapse ${openAccordion === 'about' ? 'open' : ''}`}>
              <ul className="rf-accordion-links">
                <li><Link to="/about">Our Founder-Chairman</Link></li>
                <li><Link to="/about">Our Impact & Reach</Link></li>
                <li><Link to="/about">Our Story & Mission</Link></li>
                <li><Link to="/objectives">Objectives of Foundation</Link></li>
                <li><Link to="/specialties">What We Do</Link></li>
                <li><Link to="/philosophy">Philosophy & Ethics</Link></li>
              </ul>
            </div>
          </div>

          {/* 2. What We Do */}
          <div className="rf-accordion-item">
            <button
              type="button"
              className="rf-accordion-header"
              onClick={() => toggleAccordion('whatWeDo')}
              aria-expanded={openAccordion === 'whatWeDo'}
            >
              <span>What We Do</span>
              <FaChevronDown className={`rf-accordion-chevron ${openAccordion === 'whatWeDo' ? 'open' : ''}`} />
            </button>
            <div className={`rf-accordion-collapse ${openAccordion === 'whatWeDo' ? 'open' : ''}`}>
              <ul className="rf-accordion-links">
                <li><Link to="/contribution">Rural Transformation</Link></li>
                <li><Link to="/contribution">Emergency Food & Ration</Link></li>
                <li><Link to="/contribution">Clean Water & Sanitation</Link></li>
                <li><Link to="/specialties">Healthcare & Medical Relief</Link></li>
                <li><Link to="/contribution">Disaster Management</Link></li>
                <li><Link to="/specialties">Women & Child Support</Link></li>
                <li><Link to="/objectives">Community Empowerment</Link></li>
                <li><Link to="/contribution">Rebuilding Shelter Homes</Link></li>
                <li><Link to="/objectives">Village Self-Reliance</Link></li>
              </ul>
            </div>
          </div>

          {/* 3. Insights */}
          <div className="rf-accordion-item">
            <button
              type="button"
              className="rf-accordion-header"
              onClick={() => toggleAccordion('insights')}
              aria-expanded={openAccordion === 'insights'}
            >
              <span>Insights</span>
              <FaChevronDown className={`rf-accordion-chevron ${openAccordion === 'insights' ? 'open' : ''}`} />
            </button>
            <div className={`rf-accordion-collapse ${openAccordion === 'insights' ? 'open' : ''}`}>
              <ul className="rf-accordion-links">
                <li><Link to="/ground-report">Ground Relief Reports</Link></li>
                <li><Link to="/about">Stories About Our Work</Link></li>
                <li><Link to="/ground-report">Relief Drive Bulletins</Link></li>
              </ul>
            </div>
          </div>

          {/* 4. Media */}
          <div className="rf-accordion-item">
            <button
              type="button"
              className="rf-accordion-header"
              onClick={() => toggleAccordion('media')}
              aria-expanded={openAccordion === 'media'}
            >
              <span>Media</span>
              <FaChevronDown className={`rf-accordion-chevron ${openAccordion === 'media' ? 'open' : ''}`} />
            </button>
            <div className={`rf-accordion-collapse ${openAccordion === 'media' ? 'open' : ''}`}>
              <ul className="rf-accordion-links">
                <li><Link to="/gallery">Ground Photo Gallery</Link></li>
                <li><Link to="/gallery">Press & Media Releases</Link></li>
                <li><Link to="/gallery">Relief Documentaries</Link></li>
                <li><Link to="/ground-report">Live Flood Updates</Link></li>
              </ul>
            </div>
          </div>

          {/* 5. Quick Links */}
          <div className="rf-accordion-item">
            <button
              type="button"
              className="rf-accordion-header"
              onClick={() => toggleAccordion('quickLinks')}
              aria-expanded={openAccordion === 'quickLinks'}
            >
              <span>Quick Links</span>
              <FaChevronDown className={`rf-accordion-chevron ${openAccordion === 'quickLinks' ? 'open' : ''}`} />
            </button>
            <div className={`rf-accordion-collapse ${openAccordion === 'quickLinks' ? 'open' : ''}`}>
              <ul className="rf-accordion-links">
                <li><Link to="/contribution">Support Relief Drives</Link></li>
                <li><Link to="/appointment">Request Relief Assistance</Link></li>
                <li><Link to="/contact">Volunteer Registration</Link></li>
                <li><Link to="/contribution">Direct Bank Donation</Link></li>
                <li><Link to="/about">Transparency & Audits</Link></li>
                <li>
                  <a href="https://flood-relief.pages.dev/" target="_blank" rel="noopener noreferrer">
                    Live Relief Dashboard
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* 6. Direct Link: Careers */}
          <div className="rf-accordion-item rf-direct-item">
            <Link to="/contact" className="rf-direct-link">
              Careers
            </Link>
          </div>

          {/* 7. Direct Link: Contact Us */}
          <div className="rf-accordion-item rf-direct-item">
            <Link to="/contact" className="rf-direct-link">
              Contact Us
            </Link>
          </div>

          {/* 8. Direct Link: Caution Notice */}
          <div className="rf-accordion-item rf-direct-item">
            <Link to="/philosophy" className="rf-direct-link">
              Caution Notice
            </Link>
          </div>

          {/* Mobile Brand Logo & Socials Section */}
          <div className="rf-mobile-brand-section">
            <Link to="/" className="rf-brand-block" aria-label="Patkai Mahabahu Foundation Home">
              <img src={logoImg} alt="Patkai Mahabahu Foundation Logo" className="rf-brand-logo" />
              <div className="rf-brand-text">
                <span className="rf-brand-assamese">পাটকাই মহাবাহু ফাউণ্ডেচন</span>
                <span className="rf-brand-english">Patkai Mahabahu Foundation</span>
              </div>
            </Link>

            <div className="rf-social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="rf-social-btn">
                <FaFacebookF size={14} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter X" className="rf-social-btn">
                <FaXTwitter size={14} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rf-social-btn">
                <FaLinkedinIn size={14} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rf-social-btn">
                <FaInstagram size={14} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="rf-social-btn">
                <FaYoutube size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="rf-footer-bottom">
          <div className="rf-bottom-content">
            <p className="rf-copyright-text">
              © {new Date().getFullYear()}. All rights reserved
              <span className="rf-sep">|</span>
              <Link to="/contact">Terms & Conditions</Link>
              <span className="rf-sep">|</span>
              <Link to="/contact">Privacy Policy</Link>
              <span className="rf-sep">|</span>
              Designed & Developed by{' '}
              <a
                href="https://www.binudsoftwaresolutions.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="rf-dev-link"
              >
                Binud Software Solutions
              </a>
            </p>
          </div>
        </div>

        {/* Decorative Leaf SVG in Bottom-Right Corner (Reliance Foundation signature) */}
        <div className="rf-corner-leaf-decor" aria-hidden="true">
          <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M120 160C120 160 110 80 190 40C190 40 210 120 120 160Z"
              fill="#48A047"
              fillOpacity="0.32"
            />
            <path
              d="M20 160C20 160 30 70 140 30C140 30 155 120 20 160Z"
              fill="#005C8A"
              fillOpacity="0.2"
            />
          </svg>
        </div>
      </div>
    </footer>
  )
}
