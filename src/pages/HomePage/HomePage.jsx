import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  FaArrowRight,
  FaBoxOpen,
  FaDroplet,
  FaTent,
  FaHouse,
  FaChevronRight,
  FaChevronLeft,
  FaExpand,
  FaXmark,
  FaArrowUpRightFromSquare,
  FaHeart,
} from 'react-icons/fa6'
import heroBg from '../../assets/hero/hero_bg.jpg'
import hero1 from '../../assets/hero/hero1.jpg'
import hero2 from '../../assets/hero/hero2.jpg'
import hero4 from '../../assets/hero/hero4.jpg'
import pranabImg from '../../assets/pranab.jpeg'
import gallery1 from '../../assets/gallery/1.jpeg'
import gallery2 from '../../assets/gallery/2.jpeg'
import gallery3 from '../../assets/gallery/3.jpeg'
import gallery4 from '../../assets/gallery/4.jpeg'
import gallery5 from '../../assets/gallery/5.jpeg'
import gallery6 from '../../assets/gallery/6.jpeg'
import gallery7 from '../../assets/gallery/7.jpeg'
import gallery8 from '../../assets/gallery/8.jpeg'
import mainImg from '../../assets/main.jpeg'
import ctaImg1 from '../../assets/cta/1.png'
import './HomePage.css'

export default function HomePage() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  const heroSlides = [heroBg, hero1, hero2, hero4];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const dashboardStats = [
    { label: 'Cash Raised', value: '₹19,52,856' },
    { label: 'Cash Donors', value: '1,072' },
    { label: 'Goods Donors', value: '20' },
    { label: 'Goods Items', value: '48' },
    { label: 'Villages Attended', value: '35+' },
    { label: 'Contributions Pending', value: '12' }
  ];

  const galleryItems = [
    {
      id: 1,
      image: gallery1,
      title: 'Ground Relief & Emergency Supply Distribution',
      categoryLabel: 'Ground Relief',
      badgeBg: '#005C8A'
    },
    {
      id: 2,
      image: gallery2,
      title: 'Emergency Ration Kit Delivery to Flood Families',
      categoryLabel: 'Ground Relief',
      badgeBg: '#005C8A'
    },
    {
      id: 3,
      image: gallery3,
      title: 'Direct Household Sewa in Flood-Hit Villages',
      categoryLabel: 'Ground Relief',
      badgeBg: '#005C8A'
    },
    {
      id: 4,
      image: gallery4,
      title: 'Relief Material Loading & Transportation Drive',
      categoryLabel: 'Ground Relief',
      badgeBg: '#005C8A'
    },
    {
      id: 5,
      image: gallery5,
      title: 'Community Relief Support & Ground Team Sewa',
      categoryLabel: 'Ground Relief',
      badgeBg: '#005C8A'
    },
    {
      id: 6,
      image: gallery6,
      title: 'Emergency Aid Package Assembly for Flood Victims',
      categoryLabel: 'Ground Relief',
      badgeBg: '#005C8A'
    },
    {
      id: 7,
      image: gallery7,
      title: 'On-Ground Volunteer Coordination & Village Outreach',
      categoryLabel: 'Ground Relief',
      badgeBg: '#005C8A'
    },
    {
      id: 8,
      image: gallery8,
      title: 'On-Ground Volunteer Coordination & Village Outreach',
      categoryLabel: 'Ground Relief',
      badgeBg: '#005C8A'
    }
  ];

  const allHomeImages = galleryItems;

  const handlePrev = (e) => {
    if (e) e.stopPropagation()
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : allHomeImages.length - 1))
  }

  const handleNext = (e) => {
    if (e) e.stopPropagation()
    setSelectedIndex((prev) => (prev < allHomeImages.length - 1 ? prev + 1 : 0))
  }

  useEffect(() => {
    if (selectedIndex === null) return

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === 'Escape') {
        setSelectedIndex(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex, allHomeImages.length])

  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].clientX)
  }

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diffX = touchStartX - touchEndX
    if (diffX > 40) {
      handleNext()
    } else if (diffX < -40) {
      handlePrev()
    }
    setTouchStartX(null)
  }

  const selectedGalleryImg = selectedIndex !== null ? allHomeImages[selectedIndex] : null

  return (
    <>
      {/* Full-Width Hero Section */}
      <section className="hero-full-section hero-slider-section">
        <div className="hero-slider-container">

          {/* Desktop Background Fade Slider */}
          {heroSlides.map((slideImg, index) => (
            <div
              key={index}
              className={`hero-slide-bg hero-desktop-bg ${index === currentHeroSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slideImg})` }}
            ></div>
          ))}

          {/* Deep Teal Blue Gradient Overlay */}
          <div className="hero-gradient-overlay"></div>

          {/* Mobile Image Wrapper */}
          <div className="hero-mobile-img-wrapper">
            {heroSlides.map((slideImg, index) => (
              <img
                key={index}
                src={slideImg}
                alt="Assam Flood Relief Drive"
                className={`hero-mobile-img ${index === currentHeroSlide ? 'active' : ''}`}
              />
            ))}
          </div>

          {/* Hero Text Content */}
          <div className="hero-content-wrapper">
            <div className="hero-text-block">
              <h1 className="hero-main-title">
                <span className="hero-title-teal">Reaching Every</span><br />
                <span className="hero-title-bold">Flood-Affected Family</span>
              </h1>

              <p className="hero-banner-desc">
                Emergency ration kits, clean water and essential supplies delivered directly to families displaced by the Assam floods, village by village.
              </p>

              <div className="hero-banner-buttons">
                <Link to="/contribution" className="btn-hero-saffron">
                  <span>Provide Relief Materials</span>
                  <FaChevronRight size={14} />
                </Link>
              </div>

              {/* Slider Indicator Dots */}
              <div className="hero-slide-dots">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    className={`hero-dot ${idx === currentHeroSlide ? 'active' : ''}`}
                    onClick={() => setCurrentHeroSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Dual-Color Rashtriya Sewa Bharati Style 4-Agenda Banner Section */}
      <section className="rsb-stats-banner">
        <div className="rsb-stats-header-bar">
          <span>OUR FOUR CORE SEWA AGENDAS</span>
        </div>
        <div className="rsb-stats-grid rsb-agendas-grid">
          {/* Agenda Column 1 (Green) */}
          <Link to="/contribution" className="rsb-agenda-card rsb-card-green">
            <div className="rsb-agenda-inner">
              <div className="rsb-agenda-icon">
                <FaBoxOpen />
              </div>
              <h3 className="rsb-agenda-title">Emergency Relief</h3>
            </div>
          </Link>

          {/* Agenda Column 2 (Teal) */}
          <Link to="/contribution" className="rsb-agenda-card rsb-card-teal">
            <div className="rsb-agenda-inner">
              <div className="rsb-agenda-icon">
                <FaDroplet />
              </div>
              <h3 className="rsb-agenda-title">Clean Water & Hygiene</h3>
            </div>
          </Link>

          {/* Agenda Column 3 (Teal) */}
          <Link to="/contribution" className="rsb-agenda-card rsb-card-teal">
            <div className="rsb-agenda-inner">
              <div className="rsb-agenda-icon">
                <FaTent />
              </div>
              <h3 className="rsb-agenda-title">Emergency Shelters</h3>
            </div>
          </Link>

          {/* Agenda Column 4 (Teal) */}
          <Link to="/contribution" className="rsb-agenda-card rsb-card-teal">
            <div className="rsb-agenda-inner">
              <div className="rsb-agenda-icon">
                <FaHouse />
              </div>
              <h3 className="rsb-agenda-title">Rebuilding Homes</h3>
            </div>
          </Link>
        </div>
      </section>



      {/* About Us Section (Matching Second UI Reference Layout) */}
      <section className="about-spotlight-section">
        <div className="about-spotlight-container">
          <div className="about-grid">

            {/* Left Content Column */}
            <div className="about-left-col">
              <h2 className="about-title">
                Relief Delivered.<br />
                <span className="about-title-highlight">Transparently Tracked.</span>
              </h2>
              <p className="about-desc">
                We are committed to creating lasting positive change through initiatives in healthcare, education, environmental protection, humanitarian relief, and community development. Through dedicated volunteers and direct community engagement, we work to build stronger, healthier, and more resilient communities across Assam.
              </p>

              {/* Ground Impact Statistics Grid */}
              <div className="about-stats-grid">
                <div className="about-stat-box">
                  <span className="stat-box-num">5,000+</span>
                  <span className="stat-box-label">Ration Kits Delivered</span>
                </div>
                <div className="about-stat-box">
                  <span className="stat-box-num">40+</span>
                  <span className="stat-box-label">Villages Covered</span>
                </div>
                <div className="about-stat-box">
                  <span className="stat-box-num">100%</span>
                  <span className="stat-box-label">Direct Ground Sewa</span>
                </div>
              </div>

              <div>
                <Link to="/about" className="btn-hero-primary">
                  <span>Know More About Us</span>
                </Link>
              </div>
            </div>

            {/* Right Founder Spotlight Card */}
            <div className="founder-spotlight-card">
              <div className="founder-header">
                <img src={pranabImg} alt="Pranab Milan Gogoi" className="founder-avatar-img" />
                <div className="founder-info">
                  <p className="founder-name">Pranab Milan Gogoi</p>
                  <span className="founder-role">Founder-Chairman</span>
                  <span className="founder-org">Patkai Mahabahu Foundation</span>
                </div>
              </div>

              <div className="founder-quote-body">
                <span className="quote-mark-large">“</span>
                <p className="founder-quote-paragraph">
                  At <em>Patkai Mahabahu Foundation</em>, we are deeply committed to empowering every flood-affected family in Assam with <strong>direct, transparent ground support</strong> that provides immediate ration, clean water, and long-term rebuilding tailored to each village&apos;s emergency needs...
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Live Flood Relief Impact Dashboard Section (Split Layout: Clean Image Left, Content & Stats Right) */}
      <section className="live-dashboard-section">
        <div className="live-dashboard-container">

          {/* Left Column: Clean Image (No border radius, no overlays) */}
          <div className="dashboard-split-left">
            <img src={mainImg} alt="Assam Flood Relief Community Drive" className="dashboard-main-banner-img" />
          </div>

          {/* Right Column: Title, Subtitle, Metric Stats & CTA */}
          <div className="dashboard-split-right">
            <div className="dashboard-header-block">
              <h2 className="dashboard-main-title">
                Our Journey Begins Here
              </h2>
              <p className="dashboard-subtitle">
                Real-time tracking of community donations, ration distributions, and direct rehabilitation across Assam flood-affected villages.
              </p>
            </div>

            {/* Metric Cards Grid (Static, Non-Hoverable) */}
            <div className="dashboard-cards-grid">
              {dashboardStats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`dashboard-metric-card ${stat.isAlert ? 'metric-card-alert' : ''}`}
                >
                  <span className={`metric-card-value ${stat.isAlert ? 'text-alert-red' : ''}`}>
                    {stat.value}
                  </span>
                  <span className="metric-card-label">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* View Full Dashboard CTA Button */}
            <div className="dashboard-action-wrapper">
              <a
                href="https://flood-relief.pages.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="dashboard-live-action-btn"
                title="Open Live Dashboard"
              >
                <span>Open Live Dashboard & Contributors</span>
                <FaArrowUpRightFromSquare size={14} />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Help Us in Building a Better Future CTA Banner Section */}
      <section className="green-cta-banner-wrapper">
        <div className="green-cta-banner-inner">

          {/* Theme Art: Hands holding Heart (1.png) */}
          <div className="green-cta-art-center">
            <img src={ctaImg1} alt="Heart of Compassion" className="green-cta-illustration" />
          </div>

          {/* Foreground Text and Action Buttons */}
          <div className="green-cta-main-content">
            <div className="green-cta-text-block">
              <h2 className="green-cta-heading">Help us in building a better future</h2>
              <p className="green-cta-subheading">
                Support our initiatives so that we can reach more and more people and provide our support to the needy
              </p>
            </div>

            <div className="green-cta-actions">
              <Link to="/contribution" className="green-cta-white-btn">
                Donate Now
              </Link>
              <Link to="/contact" className="green-cta-white-btn">
                Join Us
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Ground Relief Photo Gallery Section (Dribbble Arch Layout) */}
      <section className="dribbble-gallery-section">
        <div className="dribbble-gallery-card">
          {/* Staggered Floating Photo Arch Grid */}
          <div className="dribbble-photos-wrapper">
            {galleryItems.map((item, index) => {
              const offsets = [
                'float-down',
                'float-up',
                'float-center-high',
                'float-top',
                'float-center-high',
                'float-up',
                'float-down'
              ];
              const offsetClass = offsets[index % offsets.length];
              return (
                <div
                  key={item.id}
                  className={`dribbble-photo-item ${offsetClass}`}
                  onClick={() => setSelectedIndex(index)}
                >
                  <img src={item.image} alt={item.title} />
                  <div className="gallery-overlay">
                    <span className="gallery-zoom-icon"><FaExpand size={15} /></span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Center Content Block */}
          <div className="dribbble-center-content">
            <h2 className="dribbble-main-title">
              Direct Ground Sewa in Jorhat, Sivasagar & Charaideo
            </h2>
            <p className="dribbble-subtitle">
              Reaching flood-affected families across Jorhat, Sivasagar, and Charaideo districts of Assam with emergency ration packages, clean drinking water, and immediate rebuilding support.
            </p>
            <Link to="/gallery" className="btn-hero-primary" style={{ gap: '0.65rem' }}>
              <span>View Media & Photo Gallery</span>
              <FaArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Photo Lightbox Modal with Swipe & Prev/Next Arrows */}
      {selectedGalleryImg && (
        <div
          className="gallery-modal-overlay"
          onClick={() => setSelectedIndex(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="gallery-modal-close"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close photo"
            >
              <FaXmark size={20} />
            </button>

            <button
              className="gallery-modal-nav-prev"
              onClick={handlePrev}
              aria-label="Previous photo"
            >
              <FaChevronLeft size={20} />
            </button>

            <button
              className="gallery-modal-nav-next"
              onClick={handleNext}
              aria-label="Next photo"
            >
              <FaChevronRight size={20} />
            </button>

            <img
              src={selectedGalleryImg.image}
              alt={selectedGalleryImg.title}
              className="gallery-modal-img"
            />
          </div>
        </div>
      )}
    </>
  )
}
