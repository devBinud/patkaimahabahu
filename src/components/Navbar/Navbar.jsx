import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import {
  FaPhone,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaXmark,
  FaChevronDown,
  FaMagnifyingGlass,
  FaHeart,
  FaCalendarCheck,
  FaBullhorn
} from 'react-icons/fa6'
import { FiMenu } from 'react-icons/fi'
import logoImg from '../../assets/logo.png'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSizeLevel, setFontSizeLevel] = useState('normal'); // 'small', 'normal', 'large'
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setCurrentDateTime(formatted);
    };
    updateDateTime();
    const timer = setInterval(updateDateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  const location = useLocation();
  const searchInputRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    const observer = new ResizeObserver(updateHeaderHeight);
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('drawer-open');
    } else {
      document.body.classList.remove('drawer-open');
    }
    return () => {
      document.body.classList.remove('drawer-open');
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [searchOpen]);

  const whatsappNumber = "917002808115";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Pranab Milan Gogoi, I would like to know more about the Assam Flood Relief Drive.")}`;

  const searchablePages = [
    { title: 'Live Relief Dashboard', link: '/', desc: 'Track the ongoing Assam flood relief drive' },
    { title: 'Objective of Foundation', link: '/objectives', desc: 'Official trust deed objectives: flood relief, education, healthcare & resilience' },
    { title: 'Cash Contributors List', link: '/contribution', desc: 'Public disclosure and register of verified financial donations' },
    { title: 'Provide Relief Materials', link: '/contribution', desc: 'Pledge clothes, food, hygiene kits & more' },
    { title: 'Ground Dispatch Report', link: '/ground-report', desc: 'Stories & photos from the flood relief ground team' },
    { title: 'Relief Categories', link: '/specialties', desc: 'Ration, water, shelter, medical & rehabilitation aid' },
    { title: 'Request Relief Assistance', link: '/appointment', desc: 'Ask for ration, medical, shelter or rescue support' },
    { title: 'Relief Drive Gallery', link: '/gallery', desc: 'Photos from the field and drop-off point' },
    { title: 'FAQs About the Relief Drive', link: '/philosophy', desc: 'Transparency, verification and volunteering questions' },
    { title: 'About Our Ground Team', link: '/about', desc: 'Meet the Patkai Mahabahu Foundation & organiser' },
    { title: 'Drop-off Point & Contact', link: '/contact', desc: 'Collection point address, map and phone numbers' }
  ];

  const filteredSearchResults = searchQuery.trim() === ''
    ? searchablePages
    : searchablePages.filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleFontResize = (level) => {
    setFontSizeLevel(level);
    if (level === 'small') {
      document.documentElement.style.fontSize = '90%';
    } else if (level === 'large') {
      document.documentElement.style.fontSize = '110%';
    } else {
      document.documentElement.style.fontSize = '100%';
    }
  };

  return (
    <header className="cureo-header-wrapper" ref={headerRef}>
      {/* 1. TOP NAVY UTILITY BAR (#003853) */}
      <div className="top-bar-navy">
        <div className="top-bar-container">
          <div className="top-bar-left">
            <a href="tel:+917002808115" className="phone-fullheight-link">
              <FaPhone size={11} />
              <span>+91 70028 08115</span>
            </a>
            <span className="topbar-vertical-divider"></span>
            <div className="topbar-assamese-pillars">
              <span className="pillar-item">মানৱতা</span>
              <span className="topbar-vertical-divider"></span>
              <span className="pillar-item">পৰিৱেশ</span>
              <span className="topbar-vertical-divider"></span>
              <span className="pillar-item">স্বাস্থ্য</span>
            </div>
          </div>

          <div className="top-bar-right">
            {/* Utility links */}
            <div className="utility-links-group">
              <Link to="/philosophy" className="utility-link">Transparency</Link>
              <Link to="/gallery" className="utility-link">Gallery</Link>
              <Link to="/contact" className="utility-link">Contact</Link>
            </div>

            {/* Top Bar Full Height Contribute Now Button */}
            <Link to="/contribution" className="btn-topbar-contribute">
              <span>Contribute Now</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MIDDLE WHITE BRAND HEADER BAR (Exact Match to Rashtriya Sewa Bharati) */}
      <div className="middle-brand-header">
        <div className="middle-header-container">
          {/* Logo & Dual-Language Brand Text */}
          <Link to="/" className="brand-logo-link" aria-label="Patkai Mahabahu Foundation Home">
            <img src={logoImg} alt="Patkai Mahabahu Foundation Logo" className="header-brand-logo" />
            <div className="brand-titles-block">
              <span className="brand-title-assamese">পাটকাই মহাবাহু ফাউণ্ডেচন</span>
              <h1 className="brand-title-english">Patkai Mahabahu Foundation</h1>
            </div>
          </Link>

          {/* Action Button: Join Us Only */}
          <div className="header-brand-actions">
            <Link to="/contact" className="btn-header-joinus">
              Join Us
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              className="cureo-mobile-menu-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Mobile Menu"
            >
              <FiMenu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. MAIN NAVIGATION BAR (Solid Deep Teal Blue #005C8A) */}
      <nav className={`cureo-navbar ${scrolled ? 'navbar-scrolled' : ''}`} aria-label="Main Navigation">
        <div className="navbar-container">

          {/* Desktop Navigation Links */}
          <div className="cureo-desktop-nav">
            <ul className="nav-links">

              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  end
                >
                  Home
                </NavLink>
              </li>

              {/* Dropdown 1: About Us */}
              <li className="nav-item has-dropdown">
                <span className="nav-link">
                  About Us
                  <FaChevronDown className="dropdown-chevron" />
                </span>
                <div className="nav-dropdown-menu">
                  <div className="dropdown-inner">
                    <Link to="/about" className="dropdown-item">
                      <span className="dropdown-item-title">About Patkai Mahabahu</span>
                    </Link>
                    <Link to="/objectives" className="dropdown-item">
                      <span className="dropdown-item-title">Objective of Foundation</span>
                    </Link>
                    <Link to="/philosophy" className="dropdown-item">
                      <span className="dropdown-item-title">FAQs & Transparency</span>
                    </Link>
                    <Link to="/contribution" className="dropdown-item">
                      <span className="dropdown-item-title">Cash Contributors List</span>
                    </Link>
                  </div>
                </div>
              </li>

              {/* Dropdown 2: Impact */}
              <li className="nav-item has-dropdown">
                <span className="nav-link">
                  Impact
                  <FaChevronDown className="dropdown-chevron" />
                </span>
                <div className="nav-dropdown-menu">
                  <div className="dropdown-inner">
                    <Link to="/ground-report" className="dropdown-item">
                      <span className="dropdown-item-title">Ground Dispatch Report</span>
                    </Link>
                    <Link to="/specialties" className="dropdown-item">
                      <span className="dropdown-item-title">Relief Categories</span>
                    </Link>
                    <Link to="/contribution" className="dropdown-item">
                      <span className="dropdown-item-title">Cash Contributors & Donors</span>
                    </Link>
                  </div>
                </div>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/specialties"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Our Focus Areas
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/contribution"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Disaster Management
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/gallery"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Media & Gallery
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Contact
                </NavLink>
              </li>

            </ul>
          </div>

        </div>
      </nav>

      {/* 4. "LATEST" ANNOUNCEMENT TICKER BAR (Live Date & Collection Tracking) */}
      <div className="latest-ticker-bar">
        <div className="ticker-container">
          <div className="ticker-badge">
            <FaBullhorn size={11} />
            <span>LATEST</span>
          </div>
          <div className="ticker-content-wrapper">
            <div className="ticker-text-track">
              <span className="ticker-text">
                Live Relief Update: Till now, collected <span className="ticker-amount-highlight">₹19,52,856</span> across 35+ villages | As of {currentDateTime} | Emergency ration kits, clean drinking water and shelter materials delivered directly to flood-affected families across Assam. <span className="ticker-diamond">◆</span>
              </span>
              <span className="ticker-text">
                Live Relief Update: Till now, collected <span className="ticker-amount-highlight">₹19,52,856</span> across 35+ villages | As of {currentDateTime} | Emergency ration kits, clean drinking water and shelter materials delivered directly to flood-affected families across Assam. <span className="ticker-diamond">◆</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Off-Canvas Navigation Drawer */}
      <div className={`mobile-drawer-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}></div>
      <div className={`mobile-right-drawer ${mobileMenuOpen ? 'active' : ''}`}>

        <div className="drawer-header">
          <Link to="/" className="brand-logo-link" onClick={() => setMobileMenuOpen(false)}>
            <img src={logoImg} alt="Patkai Mahabahu Foundation Logo" className="brand-logo drawer-brand-logo" />
          </Link>
          <button className="drawer-close-btn" onClick={() => setMobileMenuOpen(false)}>
            <FaXmark size={20} />
          </button>
        </div>

        <div className="drawer-body">
          <ul className="drawer-nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => `drawer-nav-link ${isActive ? 'active' : ''}`} end>
                Home / Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => `drawer-nav-link ${isActive ? 'active' : ''}`}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/objectives" className={({ isActive }) => `drawer-nav-link ${isActive ? 'active' : ''}`}>
                Objective of Foundation
              </NavLink>
            </li>
            <li>
              <NavLink to="/contribution" className={({ isActive }) => `drawer-nav-link ${isActive ? 'active' : ''}`}>
                Cash Contributors List
              </NavLink>
            </li>
            <li>
              <NavLink to="/specialties" className={({ isActive }) => `drawer-nav-link ${isActive ? 'active' : ''}`}>
                Our Focus Areas
              </NavLink>
            </li>
            <li>
              <NavLink to="/contribution" className={({ isActive }) => `drawer-nav-link ${isActive ? 'active' : ''}`}>
                Disaster Management & Relief
              </NavLink>
            </li>
            <li>
              <NavLink to="/ground-report" className={({ isActive }) => `drawer-nav-link ${isActive ? 'active' : ''}`}>
                Ground Dispatch Report
              </NavLink>
            </li>
            <li>
              <NavLink to="/philosophy" className={({ isActive }) => `drawer-nav-link ${isActive ? 'active' : ''}`}>
                FAQs & Transparency
              </NavLink>
            </li>
            <li>
              <NavLink to="/gallery" className={({ isActive }) => `drawer-nav-link ${isActive ? 'active' : ''}`}>
                Media & Gallery
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => `drawer-nav-link ${isActive ? 'active' : ''}`}>
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="drawer-footer">
          <Link to="/contribution" className="btn-header-donate" style={{ width: '100%', justifyContent: 'center' }}>
            <FaHeart size={14} />
            <span>Donate Now</span>
          </Link>
        </div>
      </div>

      {/* Quick Search Modal Overlay */}
      {searchOpen && (
        <div className="search-modal-overlay" onClick={() => setSearchOpen(false)}>
          <div className="search-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="search-modal-header">
              <div className="search-input-box">
                <FaMagnifyingGlass className="search-box-icon" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search ration kits, ground reports, drop-off point..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-modal-input"
                />
                {searchQuery && (
                  <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                    <FaXmark size={14} />
                  </button>
                )}
              </div>
              <button className="close-modal-btn" onClick={() => setSearchOpen(false)}>
                <FaXmark size={20} />
              </button>
            </div>

            <div className="search-modal-results">
              {filteredSearchResults.length > 0 ? (
                filteredSearchResults.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.link}
                    className="search-result-card"
                    onClick={() => setSearchOpen(false)}
                  >
                    <div className="search-result-title">{item.title}</div>
                    <div className="search-result-desc">{item.desc}</div>
                  </Link>
                ))
              ) : (
                <div className="search-no-results">
                  No matching pages found for &quot;{searchQuery}&quot;
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
