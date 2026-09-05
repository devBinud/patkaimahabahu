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
  FaAngleRight
} from 'react-icons/fa6'
import disasterImg2 from '../assets/disaster_management/2.jpg'
import cashContributorsData from '../data/cashContributors.json'
import './ContributionPage.css'

export default function ContributionPage() {
  const accountOrder = useMemo(() => [
    'Pranab Milan Gogoi Account',
    'Rohit Adrian Douglas A/C',
    'Kalpana Gogoi A/C',
    'Abinash A/C',
    'Vivek Das Account'
  ], [])

  // Pranab Milan Gogoi Account is OPEN by default, others start closed
  const [openAccounts, setOpenAccounts] = useState({
    'Pranab Milan Gogoi Account': true,
    'Rohit Adrian Douglas A/C': false,
    'Kalpana Gogoi A/C': false,
    'Abinash A/C': false,
    'Vivek Das Account': false
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [searchPage, setSearchPage] = useState(1)

  const isSearching = searchTerm.trim().length >= 3

  useEffect(() => {
    setSearchPage(1)
  }, [searchTerm])

  // Pre-calculate search results across all 1072 entries
  const searchResults = useMemo(() => {
    if (!isSearching) return []
    const q = searchTerm.trim().toLowerCase()
    return cashContributorsData.filter(item =>
      (item.name && item.name.toLowerCase().includes(q)) ||
      (item.amount && item.amount.toString().includes(q)) ||
      (item.section && item.section.toLowerCase().includes(q))
    )
  }, [searchTerm, isSearching])

  const searchRowsPerPage = 25
  const searchTotalPages = Math.max(1, Math.ceil(searchResults.length / searchRowsPerPage))
  const searchStartIdx = (searchPage - 1) * searchRowsPerPage
  const currentSearchItems = searchResults.slice(searchStartIdx, searchStartIdx + searchRowsPerPage)

  // Track page numbers for each account accordion
  const [accountPages, setAccountPages] = useState({
    'Pranab Milan Gogoi Account': 1,
    'Rohit Adrian Douglas A/C': 1,
    'Kalpana Gogoi A/C': 1,
    'Abinash A/C': 1,
    'Vivek Das Account': 1
  })

  const rowsPerPage = 50

  const toggleAccount = (accName) => {
    setOpenAccounts(prev => ({
      ...prev,
      [accName]: !prev[accName]
    }))
  }

  const setPageForAccount = (accName, pageNum) => {
    setAccountPages(prev => ({
      ...prev,
      [accName]: pageNum
    }))
  }

  // Pre-calculate per-account data and statistics
  const accountsData = useMemo(() => {
    const map = {}
    accountOrder.forEach(acc => {
      map[acc] = { name: acc, items: [], total: 0 }
    })
    cashContributorsData.forEach(item => {
      const sec = item.section
      if (!map[sec]) {
        map[sec] = { name: sec, items: [], total: 0 }
      }
      map[sec].items.push(item)
      map[sec].total += (item.amount || 0)
    })
    return map
  }, [accountOrder])

  const getPaginationItems = (currentPage, totalPages) => {
    const pages = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages)
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }
    return pages
  }

  return (
    <div className="disaster-page-wrapper">
      <Breadcrumb currentPage="Disaster Management" parentPage="Impact" parentLink="/ground-report" />

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
              <svg className="roadmap-wave-svg" viewBox="0 0 1200 220" preserveAspectRatio="none">
                <path
                  d="M 0 110 C 50 60, 50 60, 100 60 C 200 60, 200 160, 300 160 C 400 160, 400 60, 500 60 C 600 60, 600 160, 700 160 C 800 160, 800 60, 900 60 C 1000 60, 1000 160, 1100 160 C 1150 160, 1150 110, 1200 110"
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="2"
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
                  <span className="roadmap-node-title">RAPID GROUND ASSESSMENT</span>
                </div>

                <div className="roadmap-node-item node-down">
                  <div className="roadmap-icon-circle" style={{ '--node-color': '#7cb342' }}>
                    <span className="roadmap-icon-wrap" style={{ color: '#7cb342' }}>
                      <FaBottleWater />
                    </span>
                  </div>
                  <span className="roadmap-node-title">DRY RATIONS & CLEAN WATER</span>
                </div>

                <div className="roadmap-node-item node-up">
                  <div className="roadmap-icon-circle" style={{ '--node-color': '#005C8A' }}>
                    <span className="roadmap-icon-wrap" style={{ color: '#005C8A' }}>
                      <FaKitMedical />
                    </span>
                  </div>
                  <span className="roadmap-node-title">MEDICAL & HYGIENE AID</span>
                </div>

                <div className="roadmap-node-item node-down">
                  <div className="roadmap-icon-circle" style={{ '--node-color': '#7cb342' }}>
                    <span className="roadmap-icon-wrap" style={{ color: '#7cb342' }}>
                      <FaShieldHalved />
                    </span>
                  </div>
                  <span className="roadmap-node-title">VILLAGE DISINFECTION</span>
                </div>

                <div className="roadmap-node-item node-up">
                  <div className="roadmap-icon-circle" style={{ '--node-color': '#005C8A' }}>
                    <span className="roadmap-icon-wrap" style={{ color: '#005C8A' }}>
                      <FaPeopleRoof />
                    </span>
                  </div>
                  <span className="roadmap-node-title">SHELTER & TARPAULINS</span>
                </div>

                <div className="roadmap-node-item node-down">
                  <div className="roadmap-icon-circle" style={{ '--node-color': '#7cb342' }}>
                    <span className="roadmap-icon-wrap" style={{ color: '#7cb342' }}>
                      <FaHandHoldingHeart />
                    </span>
                  </div>
                  <span className="roadmap-node-title">POST-FLOOD REBUILDING</span>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Cash Contributors Register */}
          <section className="disaster-contributors-section">
            <div className="section-heading-block">
              <h2 className="section-title">Flood Relief Cash Contributors Register</h2>
              <p className="section-subtitle">
                Public disclosure of verified financial contributions received across official collection accounts for the Saraideu, Sivasagar, and Jorhat Flood Relief Mission.
              </p>
            </div>


            {/* Total Only - Single Stat before Search */}
            <div className="contrib-single-total-wrapper">
              <div className="contrib-stat-box contrib-single-total-box">
                <span className="contrib-stat-label">Total Cash Received</span>
                <span className="contrib-stat-val">₹19,52,856</span>
              </div>
            </div>

            {/* Global Search Bar */}
            <div className="table-controls-bar">
              <div className="table-search-field">
                <FaMagnifyingGlass className="search-field-icon" />
                <input
                  type="text"
                  placeholder="Search contributor name or amount (type at least 3 letters)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="table-search-input"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="search-clear-action"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>
              {searchTerm.trim().length > 0 && searchTerm.trim().length < 3 ? (
                <span className="search-active-hint">
                  Type at least 3 letters to search across all accounts...
                </span>
              ) : null}
            </div>

            {/* When Searching (3+ letters): Show unified search results with Collection Account column */}
            {isSearching ? (
              <div className="global-search-results-block">
                <div className="search-results-header">
                  <div className="search-results-meta">
                    <span className="search-results-count">
                      Found <strong>{searchResults.length.toLocaleString('en-IN')}</strong> {searchResults.length === 1 ? 'match' : 'matches'} for "<strong>{searchTerm.trim()}</strong>"
                    </span>
                    {searchResults.length > 0 && (
                      <span className="search-results-range">
                        Showing {searchStartIdx + 1}–{Math.min(searchStartIdx + searchRowsPerPage, searchResults.length)}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="search-results-clear-btn"
                  >
                    Clear Search
                  </button>
                </div>

                {searchResults.length > 0 ? (
                  <>
                    <div className="clean-table-container">
                      <table className="clean-contributors-table">
                        <thead>
                          <tr>
                            <th style={{ width: '50px' }}>#</th>
                            <th>Contributor Name</th>
                            <th>Collection Account</th>
                            <th style={{ textAlign: 'right', width: '150px' }}>Amount (₹)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentSearchItems.map((c, idx) => (
                            <tr key={c.id}>
                              <td className="td-index">{searchStartIdx + idx + 1}</td>
                              <td className="td-name">{c.name}</td>
                              <td className="td-account">
                                <span className="account-matched-tag">{c.section}</span>
                              </td>
                              <td className="td-amount">₹{c.amount.toLocaleString('en-IN')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination for Search Results */}
                    {searchTotalPages > 1 && (
                      <div className="table-pagination-nav">
                        <button
                          type="button"
                          className="pagination-btn arrow-btn"
                          onClick={() => setSearchPage(p => Math.max(1, p - 1))}
                          disabled={searchPage === 1}
                          aria-label="Previous page"
                        >
                          <FaAngleLeft /> Previous
                        </button>

                        <div className="pagination-numbers">
                          {getPaginationItems(searchPage, searchTotalPages).map((item, pIdx) => (
                            item === '...' ? (
                              <span key={`search-dots-${pIdx}`} className="pagination-ellipsis">...</span>
                            ) : (
                              <button
                                key={`search-page-${item}`}
                                type="button"
                                className={`pagination-num-btn ${searchPage === item ? 'active' : ''}`}
                                onClick={() => setSearchPage(item)}
                              >
                                {item}
                              </button>
                            )
                          ))}
                        </div>

                        <button
                          type="button"
                          className="pagination-btn arrow-btn"
                          onClick={() => setSearchPage(p => Math.min(searchTotalPages, p + 1))}
                          disabled={searchPage === searchTotalPages}
                          aria-label="Next page"
                        >
                          Next <FaAngleRight />
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="search-no-match-box">
                    <p className="search-no-match-title">No matching contributors found</p>
                    <p className="search-no-match-desc">
                      We couldn't find any contributions matching "<strong>{searchTerm.trim()}</strong>" across any of the 5 relief accounts.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSearchTerm('')}
                      className="search-reset-inline-btn"
                    >
                      View All Contributors
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* When NOT searching: Show regular 5-account accordion stack */
              <div className="contributors-accordion-stack">
                {accountOrder.map(accName => {
                  const data = accountsData[accName] || { items: [], total: 0 }
                  const isOpen = !!openAccounts[accName]

                  const currentPage = accountPages[accName] || 1
                  const totalPages = Math.max(1, Math.ceil(data.items.length / rowsPerPage))
                  const startIdx = (currentPage - 1) * rowsPerPage
                  const pageItems = data.items.slice(startIdx, startIdx + rowsPerPage)

                  return (
                    <div key={accName} className={`contrib-accordion-card ${isOpen ? 'is-open' : ''}`}>
                      {/* Accordion Toggle Header */}
                      <button
                        type="button"
                        className={`contrib-accordion-header ${isOpen ? 'is-open' : ''}`}
                        onClick={() => toggleAccount(accName)}
                        aria-expanded={isOpen}
                      >
                        <div className="accordion-header-left">
                          <span className="accordion-kicker">Collection Account</span>
                          <h3 className="accordion-acc-title">{accName}</h3>
                        </div>

                        <div className="accordion-header-right">
                          <div className="accordion-metrics">
                            <span className="accordion-count-badge">
                              <strong>{data.items.length.toLocaleString('en-IN')}</strong> Contributors
                            </span>
                            <span className="accordion-amount-badge">
                              Total: <strong>₹{Math.round(data.total).toLocaleString('en-IN')}</strong>
                            </span>
                          </div>
                          <span className={`accordion-chevron ${isOpen ? 'rotate' : ''}`}>
                            <FaChevronDown />
                          </span>
                        </div>
                      </button>

                      {/* Accordion Content Body */}
                      {isOpen && (
                        <div className="contrib-accordion-body">
                          <div className="accordion-body-meta">
                            <span className="accordion-body-count">
                              Showing <strong>{data.items.length === 0 ? 0 : startIdx + 1}</strong>–<strong>{Math.min(startIdx + rowsPerPage, data.items.length)}</strong> of <strong>{data.items.length.toLocaleString('en-IN')}</strong> contributors
                            </span>
                          </div>

                          {/* Clean Table without repeated Account Column */}
                          <div className="clean-table-container">
                            <table className="clean-contributors-table">
                              <thead>
                                <tr>
                                  <th style={{ width: '60px' }}>#</th>
                                  <th>Contributor Name</th>
                                  <th style={{ textAlign: 'right', width: '220px' }}>Amount (₹)</th>
                                </tr>
                              </thead>
                              <tbody>
                                {pageItems.map((c, idx) => (
                                  <tr key={c.id}>
                                    <td className="td-index">{startIdx + idx + 1}</td>
                                    <td className="td-name">{c.name}</td>
                                    <td className="td-amount">₹{c.amount.toLocaleString('en-IN')}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          {/* Pagination for this accordion */}
                          {totalPages > 1 && (
                            <div className="table-pagination-nav">
                              <button
                                type="button"
                                className="pagination-btn arrow-btn"
                                onClick={() => setPageForAccount(accName, Math.max(1, currentPage - 1))}
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
                                      onClick={() => setPageForAccount(accName, item)}
                                    >
                                      {item}
                                    </button>
                                  )
                                ))}
                              </div>

                              <button
                                type="button"
                                className="pagination-btn arrow-btn"
                                onClick={() => setPageForAccount(accName, Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                aria-label="Next page"
                              >
                                Next <FaAngleRight />
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            <p className="table-note-text">
              * All entries are extracted directly from official collection logs and bank statements across all 5 ground relief accounts. Every rupee received was directed toward emergency flood rations, medical aid, rescue boats, disinfection, and rehabilitation.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
