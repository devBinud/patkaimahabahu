import { useState, useEffect } from 'react'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
import {
  FaXmark,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa6'
import media1 from '../assets/gallery/media/1.jpeg'
import media2 from '../assets/gallery/media/2.jpeg'
import './NewsMediaPage.css'

export default function NewsMediaPage() {
  const [selectedImgIndex, setSelectedImgIndex] = useState(null)

  const pressClippings = [
    {
      id: 'pc-1',
      image: media1,
      publication: 'Regional Print Media',
      title: 'Media Coverage: Flood Relief Operations Across Upper Assam Villages',
      date: 'September 2026',
      desc: 'Extensive regional press coverage highlighting the swift emergency ration kits and dry food dispatch carried out by Patkai Mahabahu Foundation across submerged localities.'
    },
    {
      id: 'pc-2',
      image: media2,
      publication: 'State Daily Press',
      title: 'Ground Sewa & Household Aid Reaching Displaced Flood Families',
      date: 'August 2026',
      desc: 'Local daily coverage detailing the direct doorstep delivery of essential relief, medical kits, and baby food to marooned families in Sivasagar and Jorhat riverine areas.'
    }
  ]

  const handlePrev = (e) => {
    if (e) e.stopPropagation()
    setSelectedImgIndex((prev) => (prev > 0 ? prev - 1 : pressClippings.length - 1))
  }

  const handleNext = (e) => {
    if (e) e.stopPropagation()
    setSelectedImgIndex((prev) => (prev < pressClippings.length - 1 ? prev + 1 : 0))
  }

  useEffect(() => {
    if (selectedImgIndex === null) return

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev()
      else if (e.key === 'ArrowRight') handleNext()
      else if (e.key === 'Escape') setSelectedImgIndex(null)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImgIndex])

  const selectedClipping = selectedImgIndex !== null ? pressClippings[selectedImgIndex] : null

  return (
    <div className="news-media-page">
      <Breadcrumb currentPage="News & Media" parentPage="Media & Gallery" parentLink="/gallery" />

      {/* Main Content Area */}
      <div className="news-content-wrapper">
        <div className="news-main-container">

          {/* SECTION 1: Newspaper Clippings & Print Coverage */}
          <section className="news-block">
            <div className="news-block-header">
              <h2 className="news-block-title">
                Newspaper &amp; Print <span className="news-title-highlight">Media Coverage</span>
              </h2>
            </div>

            <div className="news-clippings-grid">
              {pressClippings.map((item, idx) => (
                <article
                  key={item.id}
                  className="news-clipping-card"
                  onClick={() => setSelectedImgIndex(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') setSelectedImgIndex(idx) }}
                >
                  <div className="news-clipping-img-wrap">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="news-clipping-img"
                    />
                  </div>
                </article>
              ))}
            </div>
          </section>

        </div>
      </div>

      {/* Lightbox Modal for Newspaper Clippings */}
      {selectedClipping && (
        <div
          className="news-modal-overlay"
          onClick={() => setSelectedImgIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="news-modal-topbar" onClick={(e) => e.stopPropagation()}>
            <div className="news-modal-info">
              <span className="news-modal-pill">
                {selectedImgIndex + 1} / {pressClippings.length}
              </span>
            </div>
            <button
              className="news-modal-close"
              onClick={() => setSelectedImgIndex(null)}
              aria-label="Close newspaper article"
            >
              <FaXmark size={20} />
            </button>
          </div>

          <button
            className="news-modal-nav-prev"
            onClick={handlePrev}
            aria-label="Previous article"
          >
            <FaChevronLeft size={22} />
          </button>

          <button
            className="news-modal-nav-next"
            onClick={handleNext}
            aria-label="Next article"
          >
            <FaChevronRight size={22} />
          </button>

          <div
            className="news-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedClipping.image}
              alt={selectedClipping.title}
              className="news-modal-img"
            />
          </div>
        </div>
      )}
    </div>
  )
}
