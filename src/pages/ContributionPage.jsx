import { useState, useMemo, useEffect } from 'react'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
import {
  FaTruckFast,
  FaBottleWater,
  FaKitMedical,
  FaShieldHalved,
  FaPeopleRoof,
  FaHandHoldingHeart,
  FaMagnifyingGlass,
  FaChevronDown,
  FaAngleLeft,
  FaAngleRight,
  FaCircleInfo
} from 'react-icons/fa6'
import disasterImg2 from '../assets/disaster_management/2.jpg'
import cashContributorsData from '../data/cashContributors.json'
import augustContributionsData from '../data/augustContributions.json'
import './ContributionPage.css'

export default function ContributionPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 50

  const filteredContributors = useMemo(() => {
    const q = searchTerm.trim().toLowerCase()
    if (!q) return cashContributorsData
    return cashContributorsData.filter(item =>
      (item.name && item.name.toLowerCase().includes(q)) ||
      (item.amount && item.amount.toString().includes(q))
    )
  }, [searchTerm])

  const totalAmount = useMemo(() => {
    return cashContributorsData.reduce((sum, item) => sum + (item.amount || 0), 0)
  }, [])

  const totalPages = Math.max(1, Math.ceil(filteredContributors.length / rowsPerPage))
  const startIdx = (currentPage - 1) * rowsPerPage
  const currentItems = filteredContributors.slice(startIdx, startIdx + rowsPerPage)

  // August 2026 Register State & Logic
  const [augustSearch, setAugustSearch] = useState('')
  const [augustPage, setAugustPage] = useState(1)
  const augustRowsPerPage = 40

  const filteredAugustContributors = useMemo(() => {
    const q = augustSearch.trim().toLowerCase()
    if (!q) return augustContributionsData
    return augustContributionsData.filter(item =>
      (item.name && item.name.toLowerCase().includes(q)) ||
      (item.particulars && item.particulars.toLowerCase().includes(q)) ||
      (item.amount && item.amount.toString().includes(q))
    )
  }, [augustSearch])

  const augustTotalPages = Math.max(1, Math.ceil(filteredAugustContributors.length / augustRowsPerPage))
  const augustStartIdx = (augustPage - 1) * augustRowsPerPage
  const currentAugustItems = filteredAugustContributors.slice(augustStartIdx, augustStartIdx + augustRowsPerPage)

  const augustTotalAmount = useMemo(() => {
    return augustContributionsData.reduce((sum, item) => sum + (item.amount || 0), 0)
  }, [])

  const getPaginationItems = (current, total) => {
    const pages = []
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i)
    } else {
      if (current <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', total)
      } else if (current >= total - 3) {
        pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total)
      } else {
        pages.push(1, '...', current - 1, current, current + 1, '...', total)
      }
    }
    return pages
  }

  return (
    <div className="disaster-page-wrapper">
      <Breadcrumb currentPage="Flood Relief Contributors" parentLink="/ground-report" />

      {/* Main Flowing Content Container */}
      <div className="disaster-content-section">
        <div className="disaster-content-container">

          {/* 1. Header & Lead Narrative */}
          <section className="disaster-intro-block">
            <h1 className="disaster-page-title">
              Flood Disaster Relief & Response: Saraideu, Sivasagar & Jorhat
            </h1>
            <p className="disaster-page-subtitle">
              Comprehensive ground relief operations, essential supply distribution, and humanitarian response active since 19 July.
            </p>

            <div className="disaster-narrative-text">
              <p className="disaster-lead-p">
                Starting from 19 July, sudden and relentless torrential rain accompanied by the swelling of the
                Dikhow, Disang, and Brahmaputra rivers resulted in severe, widespread flooding across multiple revenue circles in
                Charaideo (Saraideu), Sivasagar, and Jorhat. Vast tracts of homesteads, agricultural farmlands,
                and village arterial roads were submerged overnight, cutting off vulnerable rural communities from essential food,
                clean drinking water, and healthcare.
              </p>

              <p className="disaster-body-p">
                In direct response, Patkai Mahabahu Foundation mobilized its ground coordination units, local volunteers,
                and community rescue networks to provide uninterrupted humanitarian assistance to families in need.
              </p>
            </div>

          </section>

          {/* 2. Featured Impact Showcase: Left Stats + Center Second Image + Right Stats */}
          <section className="disaster-showcase-section" aria-label="Live Relief Metrics & Ground Impact">
            {/* Left Side Stats Cards */}
            <div className="showcase-stats-col showcase-stats-left">
              <div className="dashboard-metric-card stat-pastel-amber">
                <span className="dashboard-stat-num">₹19,52,856</span>
                <span className="dashboard-stat-label">Cash Raised</span>
              </div>
              <div className="dashboard-metric-card stat-pastel-mint">
                <span className="dashboard-stat-num">1,072</span>
                <span className="dashboard-stat-label">Cash Donors</span>
              </div>
              <div className="dashboard-metric-card stat-pastel-amber">
                <span className="dashboard-stat-num">35+</span>
                <span className="dashboard-stat-label">Villages Attended</span>
              </div>
            </div>

            {/* Center Image: Second Disaster Image Only */}
            <div className="showcase-image-col">
              <img
                src={disasterImg2}
                alt="Ground relief drive and community support in flood-affected village"
                className="showcase-center-img"
              />
            </div>

            {/* Right Side Stats Cards */}
            <div className="showcase-stats-col showcase-stats-right">
              <div className="dashboard-metric-card stat-pastel-mint">
                <span className="dashboard-stat-num">20</span>
                <span className="dashboard-stat-label">Goods Donors</span>
              </div>
              <div className="dashboard-metric-card stat-pastel-amber">
                <span className="dashboard-stat-num">48</span>
                <span className="dashboard-stat-label">Goods Items</span>
              </div>
              <div className="dashboard-metric-card stat-pastel-mint">
                <span className="dashboard-stat-num">12</span>
                <span className="dashboard-stat-label">Contributions Pending</span>
              </div>
            </div>
          </section>

          {/* 3. Wavy Roadmap Timeline (Replacing long text paragraphs) */}
          <section className="disaster-roadmap-section">
            <div className="section-heading-block">
              <h2 className="section-title">Emergency Steps & Ground Interventions Undertaken</h2>
              <p className="section-subtitle">
                Structured operational response carried out by our on-ground volunteers and field coordinators across the flood zones.
              </p>
            </div>

            <div className="roadmap-wave-container">
              {/* SVG Connecting Dotted Wave */}
              <svg className="roadmap-wave-svg" viewBox="0 0 1200 250" preserveAspectRatio="none">
                <path
                  d="M 0 100 C 50 100, 50 55, 100 55 C 200 55, 200 145, 300 145 C 400 145, 400 55, 500 55 C 600 55, 600 145, 700 145 C 800 145, 800 55, 900 55 C 1000 55, 1000 145, 1100 145 C 1150 145, 1150 100, 1200 100"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                />
              </svg>

              {/* Process Nodes */}
              <div className="roadmap-nodes-row">
                <div className="roadmap-node-item node-up">
                  <div className="roadmap-icon-circle" style={{ '--node-color': '#005C8A' }}>
                    <span className="roadmap-icon-wrap" style={{ color: '#005C8A' }}>
                      <FaTruckFast />
                    </span>
                  </div>
                  <span className="roadmap-node-title">Rapid Ground Assessment</span>
                </div>

                <div className="roadmap-node-item node-down">
                  <div className="roadmap-icon-circle" style={{ '--node-color': '#7cb342' }}>
                    <span className="roadmap-icon-wrap" style={{ color: '#7cb342' }}>
                      <FaBottleWater />
                    </span>
                  </div>
                  <span className="roadmap-node-title">Dry Rations & Clean Water</span>
                </div>

                <div className="roadmap-node-item node-up">
                  <div className="roadmap-icon-circle" style={{ '--node-color': '#005C8A' }}>
                    <span className="roadmap-icon-wrap" style={{ color: '#005C8A' }}>
                      <FaKitMedical />
                    </span>
                  </div>
                  <span className="roadmap-node-title">Medical & Hygiene Aid</span>
                </div>

                <div className="roadmap-node-item node-down">
                  <div className="roadmap-icon-circle" style={{ '--node-color': '#7cb342' }}>
                    <span className="roadmap-icon-wrap" style={{ color: '#7cb342' }}>
                      <FaShieldHalved />
                    </span>
                  </div>
                  <span className="roadmap-node-title">Village Disinfection</span>
                </div>

                <div className="roadmap-node-item node-up">
                  <div className="roadmap-icon-circle" style={{ '--node-color': '#005C8A' }}>
                    <span className="roadmap-icon-wrap" style={{ color: '#005C8A' }}>
                      <FaPeopleRoof />
                    </span>
                  </div>
                  <span className="roadmap-node-title">Shelter & Tarpaulins</span>
                </div>

                <div className="roadmap-node-item node-down">
                  <div className="roadmap-icon-circle" style={{ '--node-color': '#7cb342' }}>
                    <span className="roadmap-icon-wrap" style={{ color: '#7cb342' }}>
                      <FaHandHoldingHeart />
                    </span>
                  </div>
                  <span className="roadmap-node-title">Post-Flood Rebuilding</span>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Cash Contributors Register */}
          <section className="disaster-contributors-section">
            <div className="section-heading-block">
              <h2 className="section-title">Flood Relief Cash Contributors Register</h2>
              <p className="section-subtitle">
                Public disclosure of verified financial contributions received under Patkai Mahabahu Foundation for the Saraideu, Sivasagar, and Jorhat Flood Relief Mission.
              </p>
            </div>

            {/* Total Summary Strip */}
            <div className="contrib-single-total-wrapper" style={{ gap: '1rem', flexWrap: 'wrap' }}>
              <div className="contrib-stat-box contrib-single-total-box">
                <span className="contrib-stat-label">Total Cash Received</span>
                <span className="contrib-stat-val">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="table-controls-bar">
              <div className="table-search-field">
                <FaMagnifyingGlass className="search-field-icon" />
                <input
                  type="text"
                  placeholder="Search contributor by name or amount..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="table-search-input"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm('')
                      setCurrentPage(1)
                    }}
                    className="search-clear-action"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Table Meta Bar */}
            <div className="table-meta-bar">
              <span className="meta-results-text">
                Showing <strong>{filteredContributors.length === 0 ? 0 : startIdx + 1}</strong>–<strong>{Math.min(startIdx + rowsPerPage, filteredContributors.length)}</strong> of <strong>{filteredContributors.length.toLocaleString('en-IN')}</strong> contributors
                {searchTerm.trim() && (
                  <span> (filtered from {cashContributorsData.length.toLocaleString('en-IN')} total)</span>
                )}
              </span>
            </div>

            {/* Unified Single Table */}
            <div className="clean-table-container">
              <table className="clean-contributors-table">
                <thead>
                  <tr>
                    <th style={{ width: '60px' }}>#</th>
                    <th>Contributor Name</th>
                    <th style={{ textAlign: 'right', width: '200px' }}>Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((c, idx) => (
                      <tr key={c.id || startIdx + idx}>
                        <td className="td-index">{startIdx + idx + 1}</td>
                        <td className="td-name">{c.name}</td>
                        <td className="td-amount" style={{ textAlign: 'right', fontWeight: '500', color: '#005C8A' }}>
                          ₹{Number(c.amount).toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#64748b' }}>
                        No contributors found matching "{searchTerm}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="table-pagination-nav">
                <button
                  type="button"
                  className="pagination-btn arrow-btn"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  <FaAngleLeft /> Previous
                </button>

                <div className="pagination-numbers">
                  {getPaginationItems(currentPage, totalPages).map((item, pIdx) => (
                    item === '...' ? (
                      <span key={`dots-${pIdx}`} className="pagination-ellipsis">...</span>
                    ) : (
                      <button
                        key={`page-${item}`}
                        type="button"
                        className={`pagination-num-btn ${currentPage === item ? 'active' : ''}`}
                        onClick={() => setCurrentPage(item)}
                      >
                        {item}
                      </button>
                    )
                  ))}
                </div>

                <button
                  type="button"
                  className="pagination-btn arrow-btn"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  Next <FaAngleRight />
                </button>
              </div>
            )}

            <div className="table-info-banner">
              <p className="table-note-text">
                All contributions are accounted under the Patkai Mahabahu Foundation Flood Relief Mission. Every rupee received was directed toward emergency flood rations, medical aid, rescue operations, and village rehabilitation.
              </p>
            </div>
          </section>

          {/* 5. Contributions Register as on 20 August 2026 (From Official Signed Record) */}
          <section className="disaster-contributors-section august-contributors-section" id="august-register">
            <div className="section-heading-block">
              <h2 className="section-title">Contributions Register - As on 20 August 2026</h2>
            </div>

            {/* Total Summary Strip */}
            <div className="contrib-single-total-wrapper august-summary-strip">
              <div className="contrib-stat-box contrib-single-total-box">
                <span className="contrib-stat-label">Total Contributions</span>
                <span className="contrib-stat-val">₹{augustTotalAmount.toLocaleString('en-IN')}.00</span>
              </div>
            </div>

            {/* Search Bar for August list */}
            <div className="table-controls-bar">
              <div className="table-search-field">
                <FaMagnifyingGlass className="search-field-icon" />
                <input
                  type="text"
                  placeholder="Search contributors"
                  value={augustSearch}
                  onChange={(e) => {
                    setAugustSearch(e.target.value)
                    setAugustPage(1)
                  }}
                  className="table-search-input"
                />
                {augustSearch && (
                  <button
                    type="button"
                    onClick={() => {
                      setAugustSearch('')
                      setAugustPage(1)
                    }}
                    className="search-clear-action"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Table Meta Bar */}
            <div className="table-meta-bar">
              <span className="meta-results-text">
                Showing <strong>{filteredAugustContributors.length === 0 ? 0 : augustStartIdx + 1}</strong>–<strong>{Math.min(augustStartIdx + augustRowsPerPage, filteredAugustContributors.length)}</strong> of <strong>{filteredAugustContributors.length}</strong> contributors
                {augustSearch.trim() && (
                  <span> (filtered from {augustContributionsData.length} total)</span>
                )}
              </span>
            </div>

            {/* Clean Table */}
            <div className="clean-table-container">
              <table className="clean-contributors-table august-table">
                <thead>
                  <tr>
                    <th style={{ width: '60px' }}>#</th>
                    <th>Contributor Name</th>
                    <th>Particulars</th>
                    <th style={{ textAlign: 'right', width: '200px' }}>Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {currentAugustItems.length > 0 ? (
                    currentAugustItems.map((c, idx) => (
                      <tr key={c.id}>
                        <td className="td-index">{augustStartIdx + idx + 1}</td>
                        <td className="td-name">{c.name}</td>
                        <td className="td-particulars">{c.particulars}</td>
                        <td className="td-amount" style={{ textAlign: 'right', fontWeight: '500', color: '#005C8A' }}>
                          ₹{c.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#64748b' }}>
                        No contributors found matching "{augustSearch}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {augustTotalPages > 1 && (
              <div className="table-pagination-nav">
                <button
                  type="button"
                  className="pagination-btn arrow-btn"
                  onClick={() => setAugustPage(p => Math.max(1, p - 1))}
                  disabled={augustPage === 1}
                  aria-label="Previous page"
                >
                  <FaAngleLeft /> Previous
                </button>

                <div className="pagination-numbers">
                  {getPaginationItems(augustPage, augustTotalPages).map((item, pIdx) => (
                    item === '...' ? (
                      <span key={`august-dots-${pIdx}`} className="pagination-ellipsis">...</span>
                    ) : (
                      <button
                        key={`august-page-${item}`}
                        type="button"
                        className={`pagination-num-btn ${augustPage === item ? 'active' : ''}`}
                        onClick={() => setAugustPage(item)}
                      >
                        {item}
                      </button>
                    )
                  ))}
                </div>

                <button
                  type="button"
                  className="pagination-btn arrow-btn"
                  onClick={() => setAugustPage(p => Math.min(augustTotalPages, p + 1))}
                  disabled={augustPage === augustTotalPages}
                  aria-label="Next page"
                >
                  Next <FaAngleRight />
                </button>
              </div>
            )}

          </section>

        </div>
      </div>
    </div>
  )
}
