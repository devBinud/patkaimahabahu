import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import { FaXmark, FaChevronLeft, FaChevronRight, FaArrowRight } from 'react-icons/fa6'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

// Project Home Assessment Images
import ph1 from '../../assets/gallery/project_home/1.jpeg'
import ph2 from '../../assets/gallery/project_home/2.jpeg'
import ph3 from '../../assets/gallery/project_home/3.jpeg'
import ph4 from '../../assets/gallery/project_home/4.jpeg'
import ph5 from '../../assets/gallery/project_home/5.jpeg'
import ph6 from '../../assets/gallery/project_home/6.jpeg'
import ph7 from '../../assets/gallery/project_home/7.jpeg'
import ph8 from '../../assets/gallery/project_home/8.jpeg'
import ph9 from '../../assets/gallery/project_home/9.jpeg'
import ph10 from '../../assets/gallery/project_home/10.jpeg'
import ph11 from '../../assets/gallery/project_home/11.jpeg'
import ph12 from '../../assets/gallery/project_home/12.jpeg'

import './ProjectHomePage.css'

const projectHomeImages = [
  { id: 'ph-1', src: ph1, alt: 'Assessment Image 1' },
  { id: 'ph-2', src: ph2, alt: 'Assessment Image 2' },
  { id: 'ph-3', src: ph3, alt: 'Assessment Image 3' },
  { id: 'ph-4', src: ph4, alt: 'Assessment Image 4' },
  { id: 'ph-5', src: ph5, alt: 'Assessment Image 5' },
  { id: 'ph-6', src: ph6, alt: 'Assessment Image 6' },
  { id: 'ph-7', src: ph7, alt: 'Assessment Image 7' },
  { id: 'ph-8', src: ph8, alt: 'Assessment Image 8' },
  { id: 'ph-9', src: ph9, alt: 'Assessment Image 9' },
  { id: 'ph-10', src: ph10, alt: 'Assessment Image 10' },
  { id: 'ph-11', src: ph11, alt: 'Assessment Image 11' },
  { id: 'ph-12', src: ph12, alt: 'Assessment Image 12' }
]

export default function ProjectHomePage() {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [touchStartX, setTouchStartX] = useState(null)

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? projectHomeImages.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === projectHomeImages.length - 1 ? 0 : prev + 1))
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
  }, [selectedIndex])

  // Touch swipe navigation for mobile devices
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

  const selectedImg = selectedIndex !== null ? projectHomeImages[selectedIndex] : null

  return (
    <div className="project-home-page">
      <Breadcrumb currentPage="Project Home" />

      {/* Assessment Images Grid Showcase */}
      <section className="ph-gallery-section" aria-label="Project Home Assessment Images">
        <div className="ph-gallery-container">
          {/* Section Header */}
          <div className="ph-header-block">
            <h1 className="ph-title">House Damage Assessment</h1>
            <p className="ph-subtitle">
              On-ground structural evaluation and geo-tagged documentation of flood-damaged houses in Soraideu, Sivsagar & Jorhat.
            </p>
          </div>

          <div className="ph-images-grid">
            {projectHomeImages.map((item, idx) => (
              <div
                key={item.id}
                className="ph-image-card"
                onClick={() => setSelectedIndex(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedIndex(idx)
                  }
                }}
                aria-label={`View assessment photo ${idx + 1}`}
              >
                <div className="ph-image-wrapper">
                  <LazyLoadImage
                    src={item.src}
                    alt={item.alt}
                    effect="blur"
                    threshold={200}
                    className="ph-img"
                    wrapperClassName="ph-lazy-wrapper"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rebuilding & Rehabilitation Plan Section */}
      <section className="ph-rebuild-section" aria-label="Rebuilding 50 Flood-Resilient Homes">
        <div className="ph-rebuild-container">
          <div className="ph-rebuild-header">
            <h2 className="ph-rebuild-title">From Assessment to Rebuilding 50 Resilient Homes</h2>
            <p className="ph-rebuild-intro">
              We take a systematic, ground-up approach to flood rehabilitation: starting with rigorous damage assessments,
              conducting detailed engineering analysis, and initiating the reconstruction of permanent, elevated shelters.
              Guided by our expert advisors and structural engineers, our targeted plan is to construct 50 flood-resilient
              homes for the most vulnerable flood victims across Charaideo, Sivasagar, and Jorhat districts.
            </p>
          </div>

          {/* 3 Steps Flow */}
          <div className="ph-rebuild-grid">
            <div className="ph-rebuild-card">
              <div className="ph-rebuild-step-num">Step 01</div>
              <h3 className="ph-rebuild-card-title">Ground Assessment First</h3>
              <p className="ph-rebuild-card-desc">
                Conducting door-to-door structural evaluation, soil erosion checks, and geo-tagged vulnerability
                documentation at each homestead to prioritize families in acute distress.
              </p>
            </div>

            <div className="ph-rebuild-card">
              <div className="ph-rebuild-step-num">Step 02</div>
              <h3 className="ph-rebuild-card-title">Engineering &amp; Site Analysis</h3>
              <p className="ph-rebuild-card-desc">
                Collaborating with experienced civil engineers and technical advisors to blueprint climate-resilient,
                elevated home structures designed to withstand recurring riverbank surges.
              </p>
            </div>

            <div className="ph-rebuild-card">
              <div className="ph-rebuild-step-num">Step 03</div>
              <h3 className="ph-rebuild-card-title">Rebuilding 50 Homes</h3>
              <p className="ph-rebuild-card-desc">
                Executing the construction of 50 durable, weather-secure houses for marginalized flood victims,
                widows, and elderly residents in Charaideo, Sivasagar, and Jorhat.
              </p>
            </div>
          </div>

          {/* Key Planning Highlights & CTA */}
          <div className="ph-rebuild-footer-bar">
            <div className="ph-rebuild-stats">
              <div className="ph-rebuild-stat">
                <span className="ph-stat-num">50</span>
                <span className="ph-stat-lbl">Homes Planned</span>
              </div>
              <div className="ph-rebuild-stat-div" aria-hidden="true"></div>
              <div className="ph-rebuild-stat">
                <span className="ph-stat-num">3</span>
                <span className="ph-stat-lbl">Districts (Charaideo, Sivasagar, Jorhat)</span>
              </div>
              <div className="ph-rebuild-stat-div" aria-hidden="true"></div>
              <div className="ph-rebuild-stat">
                <span className="ph-stat-num">Expert</span>
                <span className="ph-stat-lbl">Engineers &amp; Advisors Guided</span>
              </div>
            </div>

            <Link to="/contribution" className="ph-rebuild-cta-btn">
              <span>Support Rebuilding Project</span>
              <FaArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* High-Definition Lightbox Modal */}
      {selectedImg && (
        <div
          className="ph-modal-overlay"
          onClick={() => setSelectedIndex(null)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="ph-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="ph-modal-close"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close modal"
            >
              <FaXmark size={20} />
            </button>

            <button
              className="ph-modal-nav ph-modal-prev"
              onClick={handlePrev}
              aria-label="Previous photo"
            >
              <FaChevronLeft size={22} />
            </button>

            <button
              className="ph-modal-nav ph-modal-next"
              onClick={handleNext}
              aria-label="Next photo"
            >
              <FaChevronRight size={22} />
            </button>

            <div className="ph-modal-img-container">
              <img
                src={selectedImg.src}
                alt={selectedImg.alt}
                className="ph-modal-img"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

