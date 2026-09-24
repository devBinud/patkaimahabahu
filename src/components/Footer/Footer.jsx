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
import NewsletterBanner from '../NewsletterBanner/NewsletterBanner'
import './Footer.css'

export default function Footer() {
  const [openAccordion, setOpenAccordion] = useState(null)

  const toggleAccordion = (name) => {
    setOpenAccordion((prev) => (prev === name ? null : name))
  }

  return (
    <footer className="rf-footer-wrapper">
      {/* Newsletter Subscription Banner before main footer */}
      <div>
        <NewsletterBanner />
      </div>

      {/* Main Footer Card */}
      {/* Main Footer Card */}
      <div className="rf-footer-card">
        {/* Desktop 5-Column Grid */}
        <div className="rf-footer-grid rf-desktop-only">
          {/* Column 1: About Us */}
          <div className="rf-footer-col">
            <h4 className="rf-col-heading">About Us</h4>
            <ul className="rf-links-list">
              <li><Link to="/about">Our Story & Mission</Link></li>
              <li><Link to="/about">Our Founder-Chairman</Link></li>
              <li><Link to="/objectives">Objectives of Foundation</Link></li>
              <li><Link to="/philosophy">Philosophy & Ethics</Link></li>
              <li><Link to="/philosophy">Transparency & Audits</Link></li>
            </ul>

            <div className="rf-sub-links-group">
              <Link to="/contact" className="rf-bold-link">Volunteer With Us</Link>
              <Link to="/contact" className="rf-bold-link">Contact Us</Link>
            </div>
          </div>

          {/* Column 2: What We Do */}
          <div className="rf-footer-col">
            <h4 className="rf-col-heading">What We Do</h4>
            <ul className="rf-links-list">
              <li><Link to="/project-home">Project Home</Link></li>
              <li><Link to="/contribution">Flood Relief Drive</Link></li>
              <li><Link to="/healthcare">Healthcare Camps</Link></li>
              <li><Link to="/education">Education Support</Link></li>
              <li><Link to="/environment">Environmental Protection</Link></li>
              <li><Link to="/specialties">All Focus Areas</Link></li>
            </ul>
          </div>

          {/* Column 3: Relief & Ground Impact */}
          <div className="rf-footer-col">
            <h4 className="rf-col-heading">Relief & Impact</h4>
            <ul className="rf-links-list">
              <li><Link to="/ground-report">Ground Relief Reports</Link></li>
              <li><Link to="/contribution">Flood Relief Contributors</Link></li>
              <li><Link to="/appointment">Request Relief Assistance</Link></li>
              <li><Link to="/contribution">Direct Contribution</Link></li>
            </ul>
          </div>

          {/* Column 4: Media & Gallery */}
          <div className="rf-footer-col">
            <h4 className="rf-col-heading">Media & Gallery</h4>
            <ul className="rf-links-list">
              <li><Link to="/gallery">Photo Gallery</Link></li>
              <li><Link to="/news-media">News & Media Releases</Link></li>
              <li><Link to="/social-media">Patkai Social Media</Link></li>
              <li><Link to="/contact">Get In Touch</Link></li>
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
                Deochora, Nearby Lane 10, Chandan Nagar Club Road, Assam, 781001
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
                <FaFacebookF size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter X" className="rf-social-btn">
                <FaXTwitter size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rf-social-btn">
                <FaLinkedinIn size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rf-social-btn">
                <FaInstagram size={16} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="rf-social-btn">
                <FaYoutube size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Accordion View (Only Real Existing Links) */}
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
                <li><Link to="/about">Our Story & Mission</Link></li>
                <li><Link to="/about">Our Founder-Chairman</Link></li>
                <li><Link to="/objectives">Objectives of Foundation</Link></li>
                <li><Link to="/philosophy">Philosophy & Ethics</Link></li>
                <li><Link to="/philosophy">Transparency & Audits</Link></li>
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
                <li><Link to="/project-home">Project Home</Link></li>
                <li><Link to="/contribution">Flood Relief Drive</Link></li>
                <li><Link to="/healthcare">Healthcare Camps</Link></li>
                <li><Link to="/education">Education Support</Link></li>
                <li><Link to="/environment">Environmental Protection</Link></li>
                <li><Link to="/specialties">All Focus Areas</Link></li>
              </ul>
            </div>
          </div>

          {/* 3. Relief & Ground Impact */}
          <div className="rf-accordion-item">
            <button
              type="button"
              className="rf-accordion-header"
              onClick={() => toggleAccordion('relief')}
              aria-expanded={openAccordion === 'relief'}
            >
              <span>Relief & Impact</span>
              <FaChevronDown className={`rf-accordion-chevron ${openAccordion === 'relief' ? 'open' : ''}`} />
            </button>
            <div className={`rf-accordion-collapse ${openAccordion === 'relief' ? 'open' : ''}`}>
              <ul className="rf-accordion-links">
                <li><Link to="/ground-report">Ground Relief Reports</Link></li>
                <li><Link to="/contribution">Flood Relief Contributors</Link></li>
                <li><Link to="/appointment">Request Relief Assistance</Link></li>
              </ul>
            </div>
          </div>

          {/* 4. Media & Gallery */}
          <div className="rf-accordion-item">
            <button
              type="button"
              className="rf-accordion-header"
              onClick={() => toggleAccordion('media')}
              aria-expanded={openAccordion === 'media'}
            >
              <span>Media & Gallery</span>
              <FaChevronDown className={`rf-accordion-chevron ${openAccordion === 'media' ? 'open' : ''}`} />
            </button>
            <div className={`rf-accordion-collapse ${openAccordion === 'media' ? 'open' : ''}`}>
              <ul className="rf-accordion-links">
                <li><Link to="/gallery">Photo Gallery</Link></li>
                <li><Link to="/news-media">News & Media Releases</Link></li>
                <li><Link to="/social-media">Patkai Social Media</Link></li>
              </ul>
            </div>
          </div>

          {/* 5. Direct Link: Volunteer With Us */}
          <div className="rf-accordion-item rf-direct-item">
            <Link to="/contact" className="rf-direct-link">
              Volunteer With Us
            </Link>
          </div>

          {/* 6. Direct Link: Contact Us */}
          <div className="rf-accordion-item rf-direct-item">
            <Link to="/contact" className="rf-direct-link">
              Contact Us
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
                <FaFacebookF size={16} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter X" className="rf-social-btn">
                <FaXTwitter size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="rf-social-btn">
                <FaLinkedinIn size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="rf-social-btn">
                <FaInstagram size={16} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="rf-social-btn">
                <FaYoutube size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Desktop View: Single unified bottom copyright bar (NO separate blue bar) */}
        <div className="rf-footer-bottom-desktop rf-desktop-only">
          <p className="rf-desktop-copyright-text">
            © {new Date().getFullYear()} Patkai Mahabahu Foundation. All rights reserved. &nbsp;|&nbsp; Designed & Developed by{' '}
            <a
              href="https://www.binudsoftwaresolutions.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="rf-dev-link-desktop"
            >
              Binud Software Solutions
            </a>
          </p>
        </div>

        {/* Mobile View Only: Copyright on card, followed by themed bottom developer bar */}
        <div className="rf-mobile-bottom-wrap rf-mobile-only">
          <div className="rf-patkai-copyright">
            <p className="rf-patkai-copyright-text">
              © {new Date().getFullYear()} Patkai Mahabahu Foundation. All rights reserved.
            </p>
          </div>

          <div className="rf-dev-credits-bar">
            <p className="rf-dev-credits-text">
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
      </div>
    </footer>
  )
}
