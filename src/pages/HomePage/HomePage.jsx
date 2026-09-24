import { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  FaChevronRight,
  FaChevronLeft,
  FaExpand,
  FaXmark,
  FaArrowUpRightFromSquare,
  FaHeart,
  FaCircleCheck,
  FaCheck,
  FaAward,
  FaHandHoldingDroplet,
  FaGraduationCap,
  FaSeedling,
  FaHouseChimney,
  FaHeartPulse,
  FaArrowRight,
  FaHandHoldingHeart
} from 'react-icons/fa6'

import heroSlide1 from '../../assets/hero/1.jpeg'
import heroSlide2 from '../../assets/hero/2.jpeg'
import heroSlide3 from '../../assets/hero/3.jpeg'
import heroSlide4 from '../../assets/hero/4.jpeg'
import heroImg from '../../assets/hero/hero.jpg'

import cashContributorsData from '../../data/cashContributors.json'

import pranabImg from '../../assets/pranab.jpeg'
import homeJoinUsImg from '../../assets/home_joinus.jpeg'
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
import PersonTestimonials from '../../components/PersonTestimonials/PersonTestimonials'
import useScrollReveal from '../../hooks/useScrollReveal'
import './HomePage.css'

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
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const rootRef = useRef(null);

  useScrollReveal(rootRef);

  // Real community supporters from official cash donation records (5 records)
  const topSupporters = useMemo(() => {
    return [...cashContributorsData]
      .sort((a, b) => (b.amount || 0) - (a.amount || 0))
      .slice(0, 5);
  }, []);

  // Hero Slider data and logic
  const originalSlides = [
    {
      id: 1,
      image: heroSlide1,
      alt: 'Community Flood Relief Drive distribution team with banner and local residents in Assam',
      position: 'center 38%',
    },
    {
      id: 2,
      image: heroSlide2,
      alt: 'Flood relief materials distribution program by Patkai Mahabahu Foundation and PWD',
      position: 'center 30%',
    },
    {
      id: 3,
      image: heroSlide3,
      alt: 'Emergency night relief supply distribution to flood displaced families',
      position: 'center 40%',
    },
    {
      id: 4,
      image: heroSlide4,
      alt: 'Relief distribution and shelter community support in Assam',
      position: 'center 42%',
    },
  ];

  // Infinite seamless slider array: [clone-last, 1, 2, 3, 4, clone-first]
  const extendedSlides = [
    { ...originalSlides[3], cloneKey: 'clone-last' },
    ...originalSlides,
    { ...originalSlides[0], cloneKey: 'clone-first' },
  ];

  const [activeSlideIndex, setActiveSlideIndex] = useState(1);
  const [withTransition, setWithTransition] = useState(true);
  const heroTouchStartX = useRef(null);
  const isJumpingRef = useRef(false);

  // Derive current dot index (0, 1, 2, 3)
  const currentDotIndex = (activeSlideIndex - 1 + originalSlides.length) % originalSlides.length;

  const handleNextSlide = () => {
    if (isJumpingRef.current) return;
    setWithTransition(true);
    setActiveSlideIndex((prev) => prev + 1);
  };

  const handlePrevSlide = () => {
    if (isJumpingRef.current) return;
    setWithTransition(true);
    setActiveSlideIndex((prev) => prev - 1);
  };

  // Auto-advance hero slides continuously every 2.8 seconds
  useEffect(() => {
    const slideTimer = setInterval(() => {
      handleNextSlide();
    }, 2800);
    return () => clearInterval(slideTimer);
  }, []);

  const handleDotClick = (dotIdx) => {
    setWithTransition(true);
    setActiveSlideIndex(dotIdx + 1);
  };

  const handleTransitionEnd = (e) => {
    if (e && e.target !== e.currentTarget) return;
    if (activeSlideIndex >= extendedSlides.length - 1) {
      // Reached trailing clone of slide 1 -> jump invisibly to real slide 1
      isJumpingRef.current = true;
      setWithTransition(false);
      setActiveSlideIndex(1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          isJumpingRef.current = false;
          setWithTransition(true);
        });
      });
    } else if (activeSlideIndex <= 0) {
      // Reached leading clone of slide 4 -> jump invisibly to real slide 4
      isJumpingRef.current = true;
      setWithTransition(false);
      setActiveSlideIndex(originalSlides.length);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          isJumpingRef.current = false;
          setWithTransition(true);
        });
      });
    }
  };

  const handleHeroTouchStart = (e) => {
    heroTouchStartX.current = e.touches[0].clientX;
  };

  const handleHeroTouchEnd = (e) => {
    if (heroTouchStartX.current === null) return;
    const diff = heroTouchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      handleNextSlide();
    } else if (diff < -40) {
      handlePrevSlide();
    }
    heroTouchStartX.current = null;
  };

  const focusAreas = [
    {
      id: 1,
      title: 'Flood Relief Drive',
      desc: 'Direct distribution of food rations, clean water & survival kits to displaced flood victims.',
      icon: FaHandHoldingDroplet,
      link: '/contribution',
      color: '#34548d',
      bgType: 'amber'
    },
    {
      id: 2,
      title: 'Education',
      desc: 'School supplies, textbooks and learning support for underprivileged children.',
      icon: FaGraduationCap,
      link: '/education',
      color: '#C41230',
      bgType: 'mint'
    },
    {
      id: 3,
      title: 'Environment',
      desc: 'Biodiversity conservation, animal welfare, and massive tree plantation drives.',
      icon: FaSeedling,
      link: '/environment',
      color: '#2E7D32',
      bgType: 'amber'
    },
    {
      id: 4,
      title: 'Project Home',
      desc: 'Reconstructing flood-damaged family houses with durable, safe materials.',
      icon: FaHouseChimney,
      link: '/project-home',
      color: '#D97706',
      bgType: 'mint'
    },
    {
      id: 5,
      title: 'Healthcare',
      desc: 'Free health checkups, medicine supply and doctor camps in remote villages.',
      icon: FaHeartPulse,
      link: '/healthcare',
      color: '#00796B',
      bgType: 'amber'
    }
  ];

  const dashboardStats = [
    { label: 'Cash Raised', value: '₹19,52,856', bgType: 'sky' },
    { label: 'Cash Donors', value: '1,072', bgType: 'blush' },
    { label: 'Goods Donors', value: '20', bgType: 'sky' },
    { label: 'Goods Items', value: '48', bgType: 'blush' },
    { label: 'Villages Attended', value: '35+', bgType: 'sky' },
    { label: 'Contributions Pending', value: '12', bgType: 'blush' }
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
      badgeBg: '#34548d'
    },
    {
      id: 2,
      image: gallery2,
      title: 'Emergency Ration Kit Delivery to Flood Families',
      categoryLabel: 'Ground Relief',
      badgeBg: '#34548d'
    },
    {
      id: 3,
      image: gallery3,
      title: 'Direct Household Sewa in Flood-Hit Villages',
      categoryLabel: 'Ground Relief',
      badgeBg: '#34548d'
    },
    {
      id: 4,
      image: gallery4,
      title: 'Relief Material Loading & Transportation Drive',
      categoryLabel: 'Ground Relief',
      badgeBg: '#34548d'
    },
    {
      id: 5,
      image: gallery5,
      title: 'Community Relief Support & Ground Team Sewa',
      categoryLabel: 'Ground Relief',
      badgeBg: '#34548d'
    },
    {
      id: 6,
      image: gallery6,
      title: 'Emergency Aid Package Assembly for Flood Victims',
      categoryLabel: 'Ground Relief',
      badgeBg: '#34548d'
    },
    {
      id: 7,
      image: gallery7,
      title: 'On-Ground Volunteer Coordination & Village Outreach',
      categoryLabel: 'Ground Relief',
      badgeBg: '#34548d'
    },
    {
      id: 8,
      image: gallery8,
      title: 'Direct Flood Relief Distribution Drive',
      categoryLabel: 'Ground Relief',
      badgeBg: '#34548d'
    },
    {
      id: 9,
      image: gallery9,
      title: 'Youth Volunteer Community Outreach',
      categoryLabel: 'Ground Relief',
      badgeBg: '#34548d'
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
    <div className="homepage-animated-root" ref={rootRef}>
      {/* Hero Image Slider Section (Smooth Modern Infinite Slide) */}
      <section
        className="hero-slider-section"
        aria-label="Hero Highlights Banner"
        onTouchStart={handleHeroTouchStart}
        onTouchEnd={handleHeroTouchEnd}
      >
        <div className="hero-slider-container">
          <div
            className={`hero-slider-track ${withTransition ? 'with-transition' : ''}`}
            style={{ transform: `translate3d(-${activeSlideIndex * 100}%, 0, 0)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedSlides.map((slide, index) => (
              <div
                key={slide.cloneKey || slide.id}
                className={`hero-slide-item ${index === activeSlideIndex ? 'active' : ''}`}
                aria-hidden={index !== activeSlideIndex}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="hero-slide-img"
                  style={{ objectPosition: slide.position }}
                  loading={index <= 2 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
            ))}
          </div>

          {/* Bottom Pagination Dots Bar with Modern Expanding Pill */}
          <div className="hero-slider-dots-bar" role="tablist" aria-label="Slide indicators">
            {originalSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={index === currentDotIndex}
                aria-label={`Go to slide ${index + 1}`}
                className={`hero-dot-indicator ${index === currentDotIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </div>
        </div>
      </section>




      {/* About Us Section (Matching Second UI Reference Layout) */}
      <section className="about-spotlight-section">
        <div className="about-spotlight-container">
          <div className="about-grid">

            {/* Left Column (Desktop): Content Column (Relief Delivered Transparently Tracked) */}
            <div className="about-content-col reveal">
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

            {/* Right Column: Modern Top Contributors Card (Patkai Brand Palette) */}
            <div className="about-supporters-col reveal" style={{ '--reveal-i': 1 }}>
              <div className="top-supporters-card">
                {/* Header: Eyebrow + Verified Donors Pill */}
                <h3 className="supporters-card-title">Kind Contributors</h3>

                {/* Supporters List from actual foundation records */}
                <div className="supporters-list">
                  {topSupporters.map((supporter, idx) => (
                    <div key={supporter.id || idx} className="supporter-row">
                      <div className="supporter-left">
                        <div className="supporter-meta">
                          <h4 className="supporter-name">{supporter.name}</h4>
                          <span className="supporter-subtitle">Verified Contributors</span>
                        </div>
                      </div>
                      <div className="supporter-amount">
                        ₹{supporter.amount?.toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Card Footer: Unified Site-wide PMF Button */}
                <div className="supporters-card-footer">
                  <Link to="/contribution" className="pmf-btn pmf-btn-fill supporters-full-cta">
                    <span>View all Contributors</span>
                    <span className="pmf-btn-icon">↗</span>
                  </Link>
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
            <div className="founder-editorial-media reveal">
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
            <div className="founder-editorial-content reveal" style={{ '--reveal-i': 1 }}>
              <h2 className="founder-editorial-title">Pranab Milan Gogoi</h2>
              <p className="founder-editorial-name">The Founder & Chairman </p>
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
          <div className="dashboard-split-left reveal">
            <div className="dashboard-image-frame">
              <img src={mainImg} alt="Assam Flood Relief Community Drive" className="dashboard-main-banner-img" />
            </div>

            {/* View Full Dashboard CTA Button (Strict Unified Pill Design, After Image) */}
            <div className="dashboard-action-wrapper">
              <a
                href="https://flood-relief.pages.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="dashboard-live-action-btn pmf-btn pmf-btn-fill"
                title="Open Live Dashboard"
              >
                <span>View Live Dashboard</span>
                <span className="pmf-btn-icon">↗</span>
              </a>
            </div>
          </div>

          {/* Right Column: Title, Subtitle, Fraxity Style Metric Cards */}
          <div className="dashboard-split-right reveal" style={{ '--reveal-i': 1 }}>
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
                  className={`dashboard-metric-card stat-pastel-${stat.bgType} reveal`}
                  style={{ '--reveal-i': idx }}
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

      {/* Grassroots Ground Action & Field Updates — full grid, all cards visible at once */}
      <section className="field-updates-section" aria-label="Grassroots Flood Relief Updates">
        <div className="field-updates-container">
          <div className="field-updates-header">
            <div className="field-header-left reveal">
              <h2 className="field-header-title">
                Serving Where<br /><span className="field-header-highlight">Help Matters Most</span>
              </h2>
              <p className="field-header-desc">
                Direct on-ground humanitarian relief, emergency supply distribution, and long-term rehabilitation across flood-affected communities in Assam.
              </p>
            </div>
          </div>

          {/* Card Grid */}
          <div className="field-slider-track">
            {/* Card: Photo Card - Community Outreach */}
            <Link to="/gallery" className="field-card field-photo-card">
              <img
                src={gallery5}
                alt="Standing with families after the floods"
                className="field-photo-img"
                loading="lazy"
              />
              <div className="field-photo-gradient" aria-hidden="true" />
              <div className="field-photo-body">
                <h3 className="field-photo-title">Community Outreach</h3>
              </div>
            </Link>

            {/* Card 3: Photo Card - Household Support */}
            <Link to="/gallery" className="field-card field-photo-card">
              <img
                src={gallery3}
                alt="Listening before support is planned"
                className="field-photo-img"
                loading="lazy"
              />
              <div className="field-photo-gradient" aria-hidden="true" />
              <div className="field-photo-body">
                <h3 className="field-photo-title">Household Support</h3>
              </div>
            </Link>

            {/* Card 4: Photo Card - Village Distribution */}
            <Link to="/gallery" className="field-card field-photo-card">
              <img
                src={gallery7}
                alt="Supplies coordinated at village level"
                className="field-photo-img"
                loading="lazy"
              />
              <div className="field-photo-gradient" aria-hidden="true" />
              <div className="field-photo-body">
                <h3 className="field-photo-title">Village Distribution</h3>
              </div>
            </Link>

            {/* Card 5: Photo Card - Community Meals */}
            <Link to="/gallery" className="field-card field-photo-card">
              <img
                src={gallery8}
                alt="Sharing food, restoring comfort"
                className="field-photo-img"
                loading="lazy"
              />
              <div className="field-photo-gradient" aria-hidden="true" />
              <div className="field-photo-body">
                <h3 className="field-photo-title">Community Meals</h3>
              </div>
            </Link>

            {/* Card 6: Photo Card - Project Home Rebuilding */}
            <Link to="/project-home" className="field-card field-photo-card">
              <img
                src={rebuild2}
                alt="Structural damage assessment and house rehabilitation"
                className="field-photo-img"
                loading="lazy"
              />
              <div className="field-photo-gradient" aria-hidden="true" />
              <div className="field-photo-body">
                <h3 className="field-photo-title">Project Home Rehab</h3>
              </div>
            </Link>

            {/* Card 7: Photo Card - Supply Logistics */}
            <Link to="/gallery" className="field-card field-photo-card">
              <img
                src={gallery1}
                alt="Supplies reaching families"
                className="field-photo-img"
                loading="lazy"
              />
              <div className="field-photo-gradient" aria-hidden="true" />
              <div className="field-photo-body">
                <h3 className="field-photo-title">Relief Distribution</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Project Home: Editorial Showcase (Matching Reference Screenshot 1) */}
      <section className="project-home-editorial-section">
        <div className="project-home-editorial-container">
          {/* Left Column: Story, Commitments & Actions */}
          <div className="project-home-editorial-left reveal">
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
              <Link to="/project-home" className="pmf-btn pmf-btn-outline">
                <span>Read More</span>
                <span className="pmf-btn-icon">↗</span>
              </Link>
            </div>
          </div>

          {/* Right Column: 3-Element Masonry Visual Grid */}
          <div className="project-home-editorial-right reveal" style={{ '--reveal-i': 1 }}>
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
                  <div className="editorial-stat-label">Target Rebuilding Homes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us / Trust Showcase Section (Matching Reference with Theme Blue Overlay) */}
      <section className="why-choose-section">
        <div className="why-choose-bg-media">
          <img
            src={heroImg}
            alt="Ground relief mission"
            className="why-choose-bg-img"
            aria-hidden="true"
          />
          <div className="why-choose-blue-overlay" aria-hidden="true" />
        </div>

        <div className="why-choose-container">
          <div className="why-choose-content reveal">
            <h2 className="why-choose-title">
              Why Communities Choose Patkai Mahabahu Foundation
            </h2>

            <div className="why-choose-pill-divider" aria-hidden="true" />

            <p className="why-choose-desc">
              Patkai Mahabahu Foundation stands out as a dedicated grassroots humanitarian movement with transparent ground relief, rehabilitation, and long-term community seva across Assam.
            </p>

            <div className="why-choose-btn-wrap">
              <Link to="/contact" className="pmf-btn pmf-btn-outline">
                <span>Join Us</span>
                <span className="pmf-btn-icon">↗</span>
              </Link>
            </div>
          </div>

          {/* Overlapping Featured Image Showcase Card */}
          <div className="why-choose-video-wrapper reveal" style={{ '--reveal-i': 1 }}>
            <div className="why-choose-video-card">
              <img
                src={homeJoinUsImg}
                alt="Patkai Mahabahu Foundation volunteers and team members"
                className="why-video-thumbnail"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Person Testimonials: 3D Peeking Carousel Slider */}
      <div>
        <PersonTestimonials />
      </div>

      {/* Modern Editorial 9-Image Collage Gallery Section */}
      <section className="editorial-gallery-section">
        <div className="editorial-gallery-container">
          <div className="editorial-gallery-header">
            <div className="editorial-gallery-header-left reveal">
              <h2 className="editorial-gallery-title">
                Relief Drive <span className="dashboard-title-highlight">Highlights</span>
              </h2>
              <p className="editorial-gallery-subtitle">
                Glimpses of ground relief drives, community seva, and rebuilding across Assam villages.
              </p>
            </div>
            <div className="editorial-gallery-header-right">
              <Link to="/gallery" className="pmf-btn pmf-btn-outline">
                <span>View All</span>
                <span className="pmf-btn-icon">↗</span>
              </Link>
            </div>
          </div>

          <div className="editorial-gallery-grid">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                className={`editorial-gallery-item item-${index + 1} reveal`}
                style={{ '--reveal-i': index % 5 }}
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
          {/* Top Bar: Counter on Left, Close on Right (Outside Image) */}
          <div className="gallery-modal-topbar" onClick={(e) => e.stopPropagation()}>
            <div className="gallery-modal-info">
              <span className="gallery-modal-pill">
                {selectedIndex + 1} / {allHomeImages.length}
              </span>
            </div>
            <button
              className="gallery-modal-close"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close photo"
            >
              <FaXmark size={20} />
            </button>
          </div>

          {/* Nav Buttons Floating in Overlay Margins (NOT on top of image) */}
          <button
            className="gallery-modal-nav-prev"
            onClick={handlePrev}
            aria-label="Previous photo"
          >
            <FaChevronLeft size={22} />
          </button>

          <button
            className="gallery-modal-nav-next"
            onClick={handleNext}
            aria-label="Next photo"
          >
            <FaChevronRight size={22} />
          </button>

          {/* Central Image Container - Clean & Completely Unobstructed */}
          <div
            className="gallery-modal-content"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={selectedGalleryImg.image}
              alt={selectedGalleryImg.title}
              className="gallery-modal-img"
              draggable="false"
            />
          </div>
        </div>
      )}
    </div>
  )
}
