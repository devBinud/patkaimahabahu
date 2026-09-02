import { useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
import { FaPhone, FaMapLocationDot, FaCheck } from 'react-icons/fa6'
import './ContributionPage.css'

export default function ContributionPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    area: '',
    items: [],
    details: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const availableItems = [
    { label: 'Clothes', note: 'Wearable condition' },
    { label: 'Bed sheets', note: 'Any usable condition' },
    { label: 'Undergarments', note: 'New / clean' },
    { label: 'Baby food', note: 'Sealed & unexpired' },
    { label: 'Bleaching powder', note: 'For post-flood sanitation' },
    { label: 'Mosquito nets', note: 'Usable condition' },
    { label: 'Soap', note: 'Bathing & washing' },
    { label: 'Sanitary pads', note: 'Sealed packets' },
    { label: 'Other items', note: 'Describe below' }
  ];

  const handleCheckboxChange = (label) => {
    setFormData(prev => {
      const exists = prev.items.includes(label);
      if (exists) {
        return { ...prev, items: prev.items.filter(i => i !== label) };
      } else {
        return { ...prev, items: [...prev.items, label] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (formData.items.length === 0 && !formData.details.trim()) {
      setErrorMsg('Please select at least one item, or describe what you can provide.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="contribution-page-wrapper">
      <Breadcrumb currentPage="Provide Relief Materials" parentPage="Disaster Management" parentLink="/contribution" />

      {/* Main Section (2-Column Full Width Container) */}
      <section className="contribution-main-section">
        <div className="contribution-main-container">

          <div className="contribution-grid-layout">

            {/* Left Column: Form Card */}
            <div className="contribution-form-card">
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🙏</div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                    Thank You! Your Pledge Is Recorded.
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.975rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                    Your offer now appears on our Live Relief Dashboard. Please drop the items at the collection point shown on the right.
                  </p>
                  <button
                    type="button"
                    className="btn-hero-secondary"
                    onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', area: '', items: [], details: '' }); }}
                  >
                    Submit Another Offer
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>

                  {/* 1. Your Details */}
                  <div className="form-section-card">
                    <span className="form-section-title">1. Your Details</span>

                    <div className="form-field-group">
                      <label className="form-label">Your Name *</label>
                      <input
                        type="text"
                        placeholder="Full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="form-input"
                      />
                    </div>

                    <div className="form-field-group">
                      <label className="form-label">
                        Phone Number <span className="form-sub-label">(so we can coordinate pickup)</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div className="form-field-group">
                      <label className="form-label">
                        Your Locality / Village <span className="form-sub-label">(optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Chandan Nagar, Lane 4"
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* 2. Items Checklist */}
                  <div className="form-section-card">
                    <span className="form-section-title">2. What Can You Provide?</span>

                    <div className="items-checkbox-grid">
                      {availableItems.map((it, i) => {
                        const isSelected = formData.items.includes(it.label);
                        return (
                          <label key={i} className={`chk-box-card ${isSelected ? 'selected' : ''}`}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleCheckboxChange(it.label)}
                              style={{ marginTop: '0.2rem', accentColor: 'var(--primary)' }}
                            />
                            <div>
                              <span className="chk-box-title">{it.label}</span>
                              {it.note && <span className="chk-box-note">{it.note}</span>}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. Details & Quantity */}
                  <div className="form-section-card">
                    <span className="form-section-title">3. Quantity & Additional Notes</span>

                    <div className="form-field-group">
                      <label className="form-label">
                        Rough quantity or notes <span className="form-sub-label">(optional)</span>
                      </label>
                      <textarea
                        placeholder="e.g. 2 bags of clothes, 5 new bed sheets, 1 carton baby food"
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        className="form-input form-textarea"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <div style={{ color: '#ef4444', fontWeight: '700', fontSize: '0.875rem', marginBottom: '1rem' }}>
                      {errorMsg}
                    </div>
                  )}

                  <button type="submit" className="btn-submit-offer">
                    Submit My Relief Offer
                  </button>

                </form>
              )}
            </div>

            {/* Right Column: Drop-off Point Sidebar */}
            <div className="contribution-sidebar-card">
              <span className="sidebar-badge">DROP-OFF POINT</span>
              <h3 className="sidebar-house-title">House Name: Deochora</h3>
              <p className="sidebar-address-sub">
                Nearby Lane 10, Chandan Nagar Club Road, Assam
              </p>

              <div className="sidebar-contact-highlight">
                <span className="sidebar-contact-name">Founder-Chairman</span>
                <a href="tel:7002808115" className="sidebar-contact-phone">
                  Pranab Milan Gogoi: +91 7002808115
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  )
}
