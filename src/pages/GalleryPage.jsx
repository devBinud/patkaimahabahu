import { useState, useEffect } from 'react'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
import { FaExpand, FaXmark, FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import gallery1 from '../assets/gallery/1.jpeg'
import gallery2 from '../assets/gallery/2.jpeg'
import gallery3 from '../assets/gallery/3.jpeg'
import gallery4 from '../assets/gallery/4.jpeg'
import gallery5 from '../assets/gallery/5.jpeg'
import gallery6 from '../assets/gallery/6.jpeg'
import gallery7 from '../assets/gallery/7.jpeg'
import gallery8 from '../assets/gallery/8.jpeg'
import gallery11 from '../assets/gallery/11.jpeg'
import gallery12 from '../assets/gallery/12.jpeg'
import gallery13 from '../assets/gallery/13.jpeg'
import gallery14 from '../assets/gallery/14.jpeg'
import gallery15 from '../assets/gallery/15.jpeg'
import gallery16 from '../assets/gallery/16.jpeg'
import gallery17 from '../assets/gallery/17.jpeg'
import gallery18 from '../assets/gallery/18.jpeg'
import gallery19 from '../assets/gallery/19.jpeg'
import gallery20 from '../assets/gallery/20.jpeg'
import gallery21 from '../assets/gallery/21.jpeg'
import gallery22 from '../assets/gallery/22.jpeg'
import gallery23 from '../assets/gallery/23.jpeg'
import gallery24 from '../assets/gallery/24.jpeg'
import media1 from '../assets/gallery/media/1.jpeg'
import media2 from '../assets/gallery/media/2.jpeg'
import './HomePage/HomePage.css'
import './GalleryPage.css'

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [touchStartX, setTouchStartX] = useState(null)

  const mediaItems = [
    {
      id: 'm1',
      image: media1,
      title: 'Media & Press Coverage of Relief Activities',
      categoryLabel: 'Media Coverage'
    },
    {
      id: 'm2',
      image: media2,
      title: 'Foundation Ground Work Featured in News Channels',
      categoryLabel: 'Media Coverage'
    }
  ]

  const fieldItems = [
    {
      id: 'g1',
      image: gallery1,
      title: 'Ground Relief & Emergency Supply Distribution',
      categoryLabel: 'Ground Relief'
    },
    {
      id: 'g2',
      image: gallery2,
      title: 'Emergency Ration Kit Delivery to Flood Families',
      categoryLabel: 'Ground Relief'
    },
    {
      id: 'g3',
      image: gallery3,
      title: 'Direct Household Sewa in Flood-Hit Villages',
      categoryLabel: 'Ground Relief'
    },
    {
      id: 'g4',
      image: gallery4,
      title: 'Relief Material Loading & Transportation Drive',
      categoryLabel: 'Ground Relief'
    },
    {
      id: 'g5',
      image: gallery5,
      title: 'Community Relief Support & Ground Team Sewa',
      categoryLabel: 'Ground Relief'
    },
    {
      id: 'g6',
      image: gallery6,
      title: 'Emergency Aid Package Assembly for Flood Victims',
      categoryLabel: 'Ground Relief'
    },
    {
      id: 'g7',
      image: gallery7,
      title: 'On-Ground Volunteer Coordination & Village Outreach',
      categoryLabel: 'Ground Relief'
    },
    {
      id: 'g8',
      image: gallery8,
      title: 'Ground Relief Operations & Field Support',
      categoryLabel: 'Ground Relief'
    },
    {
      id: 'g11',
      image: gallery11,
      title: 'Door-to-door Relief Dispatch in Flood Affected Zones',
      categoryLabel: 'Ground Relief'
    },
    {
      id: 'g12',
      image: gallery12,
      title: 'Flood Relief Material Distribution & Coordination',
      categoryLabel: 'Ground Relief'
    },
    {
      id: 'g13',
      image: gallery13,
      title: 'Community Outreach & Relief Kit Delivery',
      categoryLabel: 'Ground Relief'
    },
    {
      id: 'g14',
      image: gallery14,
      title: 'Direct Ground Sewa & Household Support',
      categoryLabel: 'Ground Relief'
    },
    {
      id: 'g15',
      image: gallery15,
      title: 'Emergency Ration Supply Drive in Assam Villages',
      categoryLabel: 'Ground Relief'
    },
    {
      id: 'g16',
      image: gallery16,
      title: 'Ground Relief Team Action & Aid Assembly',
      categoryLabel: 'Ground Relief'
    },
    {
      id: 'g17',
      image: gallery17,
      title: 'Assam Flood Relief Operational Field Work',
      categoryLabel: 'Ground Relief'
    },
    {
      id: 'g18',
      image: gallery18,
      title: 'Volunteer Distribution Drive in Sivasagar & Jorhat',
      categoryLabel: 'Ground Relief'
    },
    {
      id: 'g19',
      image: gallery19,
      title: 'Flood Relief Kit Handover to Displaced Families',
      categoryLabel: 'Ground Relief'
    },
    {
      id: 'g20',
      image: gallery20,
      title: 'Community Relief Action & Emergency Logistics',
      categoryLabel: 'Ground Relief'
    },
    {
      id: 'g21',
      image: gallery21,
      title: 'Field Relief Coordination & Direct Family Aid',
      categoryLabel: 'Ground Relief'
    },
    {
      id: 'g22',
      image: gallery22,
      title: 'Essential Goods Dispatch for Flood Victims',
      categoryLabel: 'Ground Relief'
    },
    {
      id: 'g23',
      image: gallery23,
      title: 'On-Ground Emergency Relief Operations',
      categoryLabel: 'Ground Relief'
    },
    {
      id: 'g24',
      image: gallery24,
      title: 'Direct Ground Relief Delivery & Volunteer Sewa',
      categoryLabel: 'Ground Relief'
    }
  ]

  const allGalleryImages = [...mediaItems, ...fieldItems]

  const handlePrev = (e) => {
    if (e) e.stopPropagation()
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : allGalleryImages.length - 1))
  }

  const handleNext = (e) => {
    if (e) e.stopPropagation()
    setSelectedIndex((prev) => (prev < allGalleryImages.length - 1 ? prev + 1 : 0))
  }

  // Keyboard Navigation (Left / Right arrows & Escape)
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
  }, [selectedIndex, allGalleryImages.length])

  // Touch Swipe Navigation for Mobile
  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].clientX)
  }

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diffX = touchStartX - touchEndX
    if (diffX > 40) {
      handleNext() // Swiped left -> next photo
    } else if (diffX < -40) {
      handlePrev() // Swiped right -> prev photo
    }
    setTouchStartX(null)
  }

  const selectedGalleryImg = selectedIndex !== null ? allGalleryImages[selectedIndex] : null

  return (
    <div className="gallery-page-wrapper">
      <Breadcrumb currentPage="Media & Photo Gallery" />

      <div className="gallery-main-section">
        <div className="gallery-main-container">

        {/* SECTION 1: TOP SIDE - Media & Press Coverage */}
        <section className="gallery-section-block">
          <div className="gallery-section-header">
            <h2 className="gallery-section-title">
              News & Press Coverage
            </h2>
          </div>

          <div className="gallery-grid">
            {mediaItems.map((item, idx) => (
              <div
                key={item.id}
                className="gallery-card"
                onClick={() => setSelectedIndex(idx)}
              >
                <div className="gallery-img-wrapper" style={{ height: '260px' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="gallery-img"
                  />
                  <div className="gallery-overlay">
                    <span className="gallery-zoom-icon"><FaExpand size={16} /></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: BOTTOM SIDE - Photos From The Field (Gallery) */}
        <section className="gallery-section-block">
          <div className="gallery-section-header">
            <h2 className="gallery-section-title">
              Photos From The Field
            </h2>
            <p className="gallery-section-desc">
              Glimpses of emergency ration distribution, boat dispatches, and ground relief work across flood-hit villages in Jorhat, Sivasagar, and Charaideo.
            </p>
          </div>

          <div className="gallery-grid-field">
            {fieldItems.map((item, idx) => (
              <div
                key={item.id}
                className="gallery-card"
                onClick={() => setSelectedIndex(mediaItems.length + idx)}
              >
                <div className="gallery-img-wrapper" style={{ height: '240px' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="gallery-img"
                  />
                  <div className="gallery-overlay">
                    <span className="gallery-zoom-icon"><FaExpand size={16} /></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        </div>
      </div>

      {/* Lightbox Modal with Touch Swipe & Prev/Next Arrows */}
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
                {selectedIndex + 1} / {allGalleryImages.length}
              </span>
              {selectedGalleryImg.title && (
                <span className="gallery-modal-title">{selectedGalleryImg.title}</span>
              )}
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
