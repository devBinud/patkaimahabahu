import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  FaArrowRight,
  FaChevronRight,
  FaChevronLeft,
  FaExpand,
  FaXmark,
  FaArrowUpRightFromSquare,
  FaHeart,
  FaCircleCheck,
  FaAward
} from 'react-icons/fa6'
import hero1 from '../../assets/hero/hero1.jpg'
import hero2 from '../../assets/hero/hero2.jpg'
import hero4 from '../../assets/hero/hero4.jpg'
import heroBg from '../../assets/hero/hero_bg.jpg'
import pranabImg from '../../assets/pranab.jpeg'
import floodReliefDeliveredImg from '../../assets/flood_relief_delivered.jpeg'
import gallery1 from '../../assets/gallery/1.jpeg'
import gallery2 from '../../assets/gallery/2.jpeg'
import gallery3 from '../../assets/gallery/3.jpeg'
import gallery4 from '../../assets/gallery/4.jpeg'
import gallery5 from '../../assets/gallery/5.jpeg'
import gallery6 from '../../assets/gallery/6.jpeg'
import gallery7 from '../../assets/gallery/7.jpeg'
import gallery8 from '../../assets/gallery/8.jpeg'
import gallery9 from '../../assets/gallery/11.jpeg'
import mainImg from '../../assets/main.jpeg'
import rebuild1 from '../../assets/gallery/rebuilding_house_assessment/1.jpeg'
import rebuild2 from '../../assets/gallery/rebuilding_house_assessment/2.jpeg'
import rebuild3 from '../../assets/gallery/rebuilding_house_assessment/3.jpeg'
import disasterIcon from '../../assets/icons/disaster-icon.jpg'
import educationIcon from '../../assets/icons/education-icon.jpg'
import vantaraIcon from '../../assets/icons/vantara_icon_r.png'
import ruralIcon from '../../assets/icons/ruralt-icon.jpg'
import healthIcon from '../../assets/icons/health-icon.jpg'
import PersonTestimonials from '../../components/PersonTestimonials/PersonTestimonials'
import './HomePage.css'

const heroSlides = [hero1, hero2, hero4, heroBg];

const HomeShelterIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 10.5L12 3l9 7.5" />
    <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
    <path d="M18 7V4h-3v2.5" />
    <path d="M10 21v-6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v6" />
  </svg>
)

export default function HomePage() {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(slideTimer);
  }, []);

  const focusAreas = [
    {
      id: 1,
      title: 'Flood Relief Drive',
      icon: disasterIcon,
      link: '/contribution',
      color: '#006798'
    },
    {
      id: 2,
      title: 'Education',
      icon: educationIcon,
      link: '/education',
      color: '#C41230'
    },
    {
      id: 3,
      title: 'Environment',
      icon: vantaraIcon,
      link: '/environment',
      color: '#2E7D32'
    },
    {
      id: 4,
      title: 'Project Home',
      icon: ruralIcon,
      link: '/project-home',
      color: '#E03A3E'
    },
    {
      id: 5,
      title: 'Healthcare',
      icon: healthIcon,
      link: '/healthcare',
      color: '#388E3C'
    }
  ];

  const dashboardStats = [
    { label: 'Cash Raised', value: '₹19,52,856', bgType: 'amber' },
    { label: 'Cash Donors', value: '1,072', bgType: 'mint' },
    { label: 'Goods Donors', value: '20', bgType: 'amber' },
    { label: 'Goods Items', value: '48', bgType: 'mint' },
    { label: 'Villages Attended', value: '35+', bgType: 'amber' },
    { label: 'Contributions Pending', value: '12', bgType: 'mint' }
  ];

  const rebuildHouses = [
    { id: 1, image: rebuild1, title: 'Assessment #1' },
    { id: 2, image: rebuild2, title: 'Assessment #2' },
    { id: 3, image: rebuild3, title: 'Assessment #3' }
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
      title: 'Direct Flood Relief Distribution Drive',
      categoryLabel: 'Ground Relief',
      badgeBg: '#005C8A'
    },
    {
      id: 9,
      image: gallery9,
      title: 'Youth Volunteer Community Outreach',
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

          {/* Background Slides (hero1, hero2, hero4, hero_bg) */}
          {heroSlides.map((slideImg, idx) => (
            <div
              key={idx}
              className={`hero-slide-bg hero-desktop-bg ${idx === currentHeroSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slideImg})` }}
              aria-hidden={idx !== currentHeroSlide}
            />
          ))}

          {/* Deep Teal Blue Gradient Overlay */}
          <div className="hero-gradient-overlay"></div>

          {/* Mobile Image Wrapper with Rotating Slides */}
          <div className="hero-mobile-img-wrapper">
            {heroSlides.map((slideImg, idx) => (
              <img
                key={idx}
                src={slideImg}
                alt={`Assam Flood Relief Drive Slide ${idx + 1}`}
                className={`hero-mobile-img ${idx === currentHeroSlide ? 'active' : ''}`}
              />
            ))}
          </div>

          {/* Hero Content Wrapper */}
          <div className="hero-content-wrapper">
            <div className="hero-content-grid">

              {/* Text Block */}
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
                  </Link>
                </div>
              </div>

            </div>


          </div>
        </div>
      </section>



      {/* Reliance Foundation Style Focus Areas Section */}
      <section className="rf-focus-outer-section">
        <div className="rf-focus-section">
          <div className="rf-focus-container">
            <div className="rf-focus-grid">
              {focusAreas.map((item) => (
                <Link key={item.id} to={item.link} className="rf-focus-item">
                  <div className="rf-icon-ring" style={{ '--ring-color': item.color }}>
                    <img src={item.icon} alt={item.title} className="rf-focus-img" />
                  </div>
                  <span className="rf-focus-title">{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* About Us Section (Matching Second UI Reference Layout) */}
      <section className="about-spotlight-section">
        <div className="about-spotlight-container">
          <div className="about-grid">

            {/* Left Column (Desktop): Content Column (Relief Delivered Transparently Tracked) */}
            <div className="about-content-col">
              <h2 className="about-title">
                Relief Delivered<br />
                <span className="about-title-highlight">Transparently Tracked</span>
              </h2>
              <p className="about-desc">
                We are committed to creating lasting positive change through initiatives in healthcare, education, environmental protection, humanitarian relief, and community development. Through dedicated volunteers and direct community engagement, we work to build stronger, healthier, and more resilient communities across Assam.
              </p>

              {/* Ground Impact Statistics Grid (Reliance Foundation 2-Card Pastel Style) */}
              <div className="about-stats-grid">
                <div className="about-stat-box stat-box-amber">
                  <span className="stat-box-num">5,000+</span>
                  <span className="stat-box-label">Ration kits delivered</span>
                </div>

                <div className="about-stat-box stat-box-mint">
                  <span className="stat-box-num">40+</span>
                  <span className="stat-box-label">Villages covered</span>
                </div>
              </div>
            </div>

            {/* Right Column (Desktop) / Top (Mobile via order:-1): Photo Frame with Decorative Corner Brackets */}
            <div className="about-photo-col">
              <div className="founder-frame-wrapper">
                <div className="founder-corner-bracket bracket-top-left" aria-hidden="true"></div>
                <div className="founder-corner-bracket bracket-bottom-right" aria-hidden="true"></div>

                <div className="founder-photo-box about-photo-box">
                  <img
                    src={floodReliefDeliveredImg}
                    alt="Flood relief delivered directly to families across Assam"
                    className="founder-photo-img"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2B. Founder & Chairman Editorial Feature Section */}
      <section className="founder-editorial-section">
        <div className="founder-editorial-container">
          <div className="founder-editorial-layout">

            {/* Left: Image with Decorative Corner Brackets */}
            <div className="founder-editorial-media">
              <div className="founder-frame-wrapper">
                <div className="founder-corner-bracket bracket-top-left" aria-hidden="true"></div>
                <div className="founder-corner-bracket bracket-bottom-right" aria-hidden="true"></div>

                <div className="founder-photo-box">
                  <img
                    src={pranabImg}
                    alt="Pranab Milan Gogoi, Founder-Chairman"
                    className="founder-photo-img"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Right: Editorial Typography */}
            <div className="founder-editorial-content">
              <h2 className="founder-editorial-title">The Founder & Chairman</h2>
              <p className="founder-editorial-name">Pranab Milan Gogoi</p>
              <div className="founder-editorial-desc">
                <p>
                  A strong commitment to humanitarian service and community development, with a vision to create meaningful and lasting change across Assam. The work extends across disaster relief, post-flood rehabilitation, healthcare, education, livelihood generation, environmental conservation, and empowerment of vulnerable communities.
                </p>
                <p>
                  Rooted in compassion and grassroots action, the vision is to reach those in need while creating sustainable opportunities for communities to rebuild, grow, and thrive.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Live Flood Relief Impact Dashboard Section */}
      <section className="live-dashboard-section">
        <div className="live-dashboard-container">

          {/* Left Column: Framed Editorial Photo + Button Directly Below Image */}
          <div className="dashboard-split-left">
            <div className="dashboard-image-frame">
              <img src={mainImg} alt="Assam Flood Relief Community Drive" className="dashboard-main-banner-img" />
            </div>

            {/* View Full Dashboard CTA Button (Strict Unified Pill Design, After Image) */}
            <div className="dashboard-action-wrapper">
              <a
                href="https://flood-relief.pages.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="dashboard-live-action-btn"
                title="Open Live Dashboard"
              >
                <span>View Live Dashboard</span>
              </a>
            </div>
          </div>

          {/* Right Column: Title, Subtitle, Fraxity Style Metric Cards */}
          <div className="dashboard-split-right">
            <div className="dashboard-header-block">
              <h2 className="dashboard-main-title">
                Our Journey <span className="dashboard-title-highlight">Begins Here</span>
              </h2>
              <p className="dashboard-subtitle">
                Real-time tracking of community donations, ration distributions, and direct rehabilitation across Assam flood-affected villages.
              </p>
            </div>

            {/* Metric Cards Grid (Pastel Style Matching 5,000+ & 40+ Top Cards) */}
            <div className="dashboard-cards-grid">
              {dashboardStats.map((stat, idx) => (
                <a
                  key={idx}
                  href="https://flood-relief.pages.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`dashboard-metric-card stat-pastel-${stat.bgType}`}
                  title={`View live details for ${stat.label}`}
                >
                  <span className="dashboard-stat-num">{stat.value}</span>
                  <span className="dashboard-stat-label">{stat.label}</span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Project Home: Editorial Showcase (Matching Reference Screenshot 1) */}
      <section className="project-home-editorial-section">
        <div className="project-home-editorial-container">
          {/* Left Column: Story, Commitments & Actions */}
          <div className="project-home-editorial-left">
            <h2 className="project-home-editorial-title">
              Rebuilding Homes <span className="project-home-title-highlight">Inspiring Hope And Shaping Futures</span>
            </h2>
            <p className="project-home-editorial-desc">
              Patkai Mahabahu Foundation has to its credit continuous dedication and an enriching journey during which on-ground relief and structural rehabilitation have reached vulnerable families on the strength of an exceptional vision and mission, as well as an untiring effort to rebuild what floodwaters destroyed.
            </p>
            <div className="project-home-checklist">
              <div className="checklist-column">
                <div className="checklist-item">
                  <FaCircleCheck className="check-icon" />
                  <span>Ground Household Damage Surveys</span>
                </div>
                <div className="checklist-item">
                  <FaCircleCheck className="check-icon" />
                  <span>Rebuilding Washed-Out Mud & Bamboo Homes</span>
                </div>
                <div className="checklist-item">
                  <FaCircleCheck className="check-icon" />
                  <span>Ensuring Safe Shelter & Dignity</span>
                </div>
              </div>
              <div className="checklist-column">
                <div className="checklist-item">
                  <FaCircleCheck className="check-icon" />
                  <span>Corrugated Tin & Bamboo Supply</span>
                </div>
                <div className="checklist-item">
                  <FaCircleCheck className="check-icon" />
                  <span>Protecting Vulnerable Children & Elders</span>
                </div>
              </div>
            </div>

            <div className="project-home-bottom-actions">
              <Link to="/project-home" className="btn-editorial-read-more">
                Read More
              </Link>
            </div>
          </div>

          {/* Right Column: 3-Element Masonry Visual Grid */}
          <div className="project-home-editorial-right">
            {/* Left tall image */}
            <div className="editorial-tall-card">
              <img
                src={rebuild2}
                alt="Household flood damage assessment survey"
                className="editorial-tall-img"
                loading="lazy"
              />
            </div>

            {/* Right stack: top image + bottom blue stat card */}
            <div className="editorial-stack-cards">
              <div className="editorial-top-card">
                <img
                  src={rebuild1}
                  alt="Rural home assessment and restoration"
                  className="editorial-top-img"
                  loading="lazy"
                />
              </div>

              <div className="editorial-stat-card">
                <img
                  src={rebuild3}
                  alt="Rural home assessment background"
                  className="editorial-stat-bg"
                  aria-hidden="true"
                />
                <div className="editorial-stat-overlay" aria-hidden="true" />
              
                <div className="editorial-stat-text-group">
                  <div className="editorial-stat-number">
                    50<span className="editorial-stat-plus">+</span>
                  </div>
                  <div className="editorial-stat-label">Target 50+ Homes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Person Testimonials: 3D Peeking Carousel Slider (Matching Screenshot 2) */}
      <PersonTestimonials />

      {/* Modern Editorial 9-Image Collage Gallery Section */}
      <section className="editorial-gallery-section">
        <div className="editorial-gallery-container">
          <div className="editorial-gallery-header">
            <div className="editorial-gallery-header-left">
              <h2 className="editorial-gallery-title">
                Relief Drive <span className="dashboard-title-highlight">Highlights</span>
              </h2>
              <p className="editorial-gallery-subtitle">
                Glimpses of ground relief drives, community seva, and rebuilding across Assam villages.
              </p>
            </div>
            <div className="editorial-gallery-header-right">
              <Link to="/gallery" className="btn-gallery-view-all">
                View All
              </Link>
            </div>
          </div>

          <div className="editorial-gallery-grid">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                className={`editorial-gallery-item item-${index + 1}`}
                onClick={() => setSelectedIndex(index)}
                title={item.title}
              >
                <img src={item.image} alt={item.title} loading="lazy" />
                <div className="editorial-gallery-overlay">
                  <span className="editorial-zoom-icon"><FaExpand size={16} /></span>
                </div>
              </div>
            ))}
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
