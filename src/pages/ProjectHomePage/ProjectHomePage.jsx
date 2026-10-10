import { useState, useEffect } from 'react'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import { FaXmark, FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa6'

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

const projectHomeImages = [ph1, ph2, ph3, ph4, ph5, ph6, ph7, ph8, ph9, ph10, ph11, ph12].map((src, i, all) => ({
  id: `ph-${i + 1}`,
  src,
  alt: `Geo-tagged photo of a flood-damaged house (${i + 1} of ${all.length})`
}))

const totalImages = projectHomeImages.length

export default function ProjectHomePage() {
  // activeIndex drives the spotlight viewer; selectedIndex drives the full-screen lightbox
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [touchStartX, setTouchStartX] = useState(null)

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1))
  }

  // Keep the spotlight on whichever photo the visitor ended on in the lightbox
  const closeModal = () => {
    setActiveIndex(selectedIndex)
    setSelectedIndex(null)
  }

  useEffect(() => {
    if (selectedIndex === null) return

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === 'Escape') {
        setActiveIndex(selectedIndex)
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

  const activeImg = projectHomeImages[activeIndex]
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

          {/* Spotlight viewer: one large photo + thumbnail picker, instead of a long wall of cards */}
          <div className="ph-showcase">
            <button
              type="button"
              className="ph-stage"
              onClick={() => setSelectedIndex(activeIndex)}
              aria-label={`View photo ${activeIndex + 1} of ${totalImages} full size`}
            >
              <img
                key={activeImg.id}
                src={activeImg.src}
                alt={activeImg.alt}
                className="ph-stage-img"
                decoding="async"
              />
              <span className="ph-stage-chip" aria-hidden="true">
                <FaExpand size={12} />
                View full size
              </span>
            </button>

            <div className="ph-panel">
              <div className="ph-thumbs">
                {projectHomeImages.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`ph-thumb${idx === activeIndex ? ' is-active' : ''}`}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Show photo ${idx + 1}`}
                    aria-pressed={idx === activeIndex}
                  >
                    <img src={item.src} alt="" loading="lazy" decoding="async" />
                  </button>
                ))}
              </div>

              <p className="ph-panel-hint">
                Every photo is geo-tagged on site with GPS coordinates and a timestamp. Select a thumbnail to preview it, or open the large photo to view it full size.
              </p>
            </div>
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
        </div>
      </section>

      {/* High-Definition Lightbox Modal */}
      {selectedImg && (
        <div
          className="ph-modal-overlay"
          onClick={closeModal}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="ph-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="ph-modal-close"
              onClick={closeModal}
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

