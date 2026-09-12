import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
import {
  FaExpand,
  FaXmark,
  FaChevronLeft,
  FaChevronRight,
  FaNewspaper,
  FaCalendarDays,
  FaFilePdf,
  FaArrowRight,
  FaBullhorn,
  FaDownload,
  FaPhone,
  FaEnvelope
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

  const pressReleases = [
    {
      id: 'pr-1',
      date: 'September 10, 2026',
      category: 'Press Release',
      title: 'Patkai Mahabahu Foundation Expands Flood Relief to 35+ Submerged Villages in Upper Assam',
      summary: 'With relentless rainfall worsening the flood situation, relief teams have mobilized emergency ration kits, potable water containers, and mosquito nets directly to over 3,200 affected families.',
      readTime: '3 min read'
    },
    {
      id: 'pr-2',
      date: 'August 28, 2026',
      category: 'Public Disclosure',
      title: '100% Financial Transparency: Foundation Releases Itemized Cash & Material Contribution Ledger',
      summary: 'Reaffirming its founding commitment to zero administrative leakage, Patkai Mahabahu Foundation has published full donor registers and ground expense audits for public review.',
      readTime: '4 min read'
    },
    {
      id: 'pr-3',
      date: 'August 14, 2026',
      category: 'Community Sewa',
      title: 'Mobile Medical Camps & Water Purification Tablets Distributed in Flood Camps',
      summary: 'Collaborating with community healthcare workers, emergency medicine boxes, ORS sachets, and halogen water purification kits were deployed to prevent post-flood waterborne outbreaks.',
      readTime: '2 min read'
    }
  ]

  const mediaCoverageHighlights = [
    {
      id: 'mc-1',
      outlet: 'Assam Regional TV & Digital News',
      headline: 'Ground Dispatch: Dedicated volunteers braving turbulent river currents to feed stranded elders and infants.',
      tag: 'Broadcast Spotlight'
    },
    {
      id: 'mc-2',
      outlet: 'Northeast Social Impact Journal',
      headline: 'How grassroots civil society initiatives like Patkai Mahabahu Foundation provide transparent, direct relief.',
      tag: 'Feature Article'
    },
    {
      id: 'mc-3',
      outlet: 'Community Radio & Field Bulletins',
      headline: 'Daily helpline coordination updates for displaced flood victims seeking clean water, dry ration, and boat rescue.',
      tag: 'Radio Dispatch'
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

      {/* Hero Banner */}
      <section className="news-hero-section">
        <div className="news-hero-container">
          <div className="news-hero-badge">
            <FaNewspaper size={13} />
            <span>PRESS & MEDIA ARCHIVE</span>
          </div>
          <h1 className="news-hero-title">News, Media & Press Coverage</h1>
          <p className="news-hero-subtitle">
            Verified news publications, newspaper reports, and official press bulletins tracking Patkai Mahabahu Foundation&apos;s humanitarian relief sewa across Assam.
          </p>
          <div className="news-hero-actions">
            <Link to="/gallery" className="btn-news-outline">
              View Photo Gallery
            </Link>
            <Link to="/social-media" className="btn-news-primary">
              Patkai Social Media
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="news-content-wrapper">
        <div className="news-main-container">

          {/* SECTION 1: Newspaper Clippings & Print Coverage */}
          <section className="news-block">
            <div className="news-block-header">
              <div>
                <span className="news-block-tag">PRINT ARCHIVES</span>
                <h2 className="news-block-title">Newspaper & Print Media Coverage</h2>
              </div>
              <p className="news-block-desc">
                Click any newspaper clipping below to open an enlarged high-resolution view.
              </p>
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
                    <div className="news-clipping-overlay">
                      <span className="news-zoom-btn">
                        <FaExpand size={15} /> View Newspaper Article
                      </span>
                    </div>
                  </div>
                  <div className="news-clipping-meta">
                    <div className="news-clipping-info-row">
                      <span className="news-pub-badge">{item.publication}</span>
                      <span className="news-pub-date">
                        <FaCalendarDays size={11} /> {item.date}
                      </span>
                    </div>
                    <h3 className="news-clipping-title">{item.title}</h3>
                    <p className="news-clipping-text">{item.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* SECTION 2: Official Press Releases */}
          <section className="news-block">
            <div className="news-block-header">
              <div>
                <span className="news-block-tag">PRESS RELEASES</span>
                <h2 className="news-block-title">Official Foundation Announcements</h2>
              </div>
              <p className="news-block-desc">
                Verified press releases and ground mission updates issued by Patkai Mahabahu Foundation.
              </p>
            </div>

            <div className="press-releases-list">
              {pressReleases.map((pr) => (
                <div key={pr.id} className="press-release-card">
                  <div className="pr-top-bar">
                    <span className="pr-badge">{pr.category}</span>
                    <span className="pr-date">
                      <FaCalendarDays size={12} /> {pr.date}
                    </span>
                    <span className="pr-readtime">{pr.readTime}</span>
                  </div>
                  <h3 className="pr-title">{pr.title}</h3>
                  <p className="pr-summary">{pr.summary}</p>
                  <div className="pr-footer">
                    <Link to="/ground-report" className="pr-link">
                      Read Detailed Ground Report <FaArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: Broadcast & Digital Media Highlights */}
          <section className="news-block">
            <div className="news-block-header">
              <div>
                <span className="news-block-tag">BROADCAST & DIGITAL</span>
                <h2 className="news-block-title">Media Mentions & Broadcast Reports</h2>
              </div>
            </div>

            <div className="media-mentions-grid">
              {mediaCoverageHighlights.map((mention) => (
                <div key={mention.id} className="mention-card">
                  <span className="mention-tag">{mention.tag}</span>
                  <h4 className="mention-outlet">{mention.outlet}</h4>
                  <p className="mention-headline">&ldquo;{mention.headline}&rdquo;</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 4: Media & Press Contact Card */}
          <section className="news-press-contact-card">
            <div className="press-contact-left">
              <div className="press-contact-icon-box">
                <FaBullhorn size={28} />
              </div>
              <div>
                <h3 className="press-contact-title">Media & Press Enquiries</h3>
                <p className="press-contact-desc">
                  Are you a journalist, media correspondent, or documentary filmmaker covering Assam flood relief? Connect directly with our ground communications desk for verified data, interview requests, and on-ground field access.
                </p>
              </div>
            </div>

            <div className="press-contact-right">
              <a href="tel:+917002808115" className="press-contact-item">
                <FaPhone size={14} className="press-icon" />
                <div>
                  <span className="press-item-label">Press Helpline</span>
                  <span className="press-item-val">+91 70028 08115</span>
                </div>
              </a>
              <a href="mailto:patkaimahabahufoundation@gmail.com" className="press-contact-item">
                <FaEnvelope size={14} className="press-icon" />
                <div>
                  <span className="press-item-label">Official Media Email</span>
                  <span className="press-item-val">patkaimahabahufoundation@gmail.com</span>
                </div>
              </a>
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
              <span className="news-modal-title">{selectedClipping.title}</span>
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
