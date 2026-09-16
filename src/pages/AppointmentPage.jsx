import { useState } from 'react'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
import {
  FaClipboardList,
  FaPhone,
  FaWhatsapp,
  FaTruckFast,
  FaShieldHalved,
  FaLocationDot
} from 'react-icons/fa6'
import './AppointmentPage.css'

export default function AppointmentPage() {
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    age: '',
    gender: 'Female',
    location: 'Dibrugarh',
    concern: 'Emergency Ration & Water',
    mode: 'Home / Village Delivery',
    preferredDate: '',
    timeSlot: 'Morning (10:00 AM - 1:00 PM)',
    notes: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappNumber = "917002808115";
    const textMessage = `*NEW RELIEF ASSISTANCE REQUEST - PATKAI MAHABAHU FOUNDATION*
---------------------------------------
👤 *Name:* ${formData.patientName || 'Not provided'}
📱 *Phone:* ${formData.phone || 'Not provided'}
🎂 *Age/Gender:* ${formData.age ? formData.age + ' yrs' : 'N/A'} (${formData.gender})
📍 *Village / Area:* ${formData.location}

🆘 *Type of Need:* ${formData.concern}
🚤 *Delivery Preference:* ${formData.mode}
📅 *Preferred Date:* ${formData.preferredDate || 'As soon as possible'}
⏰ *Preferred Time:* ${formData.timeSlot}

📝 *Details:*
${formData.notes || 'None'}
---------------------------------------
_Sent from Patkai Mahabahu Foundation Relief Portal_`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(textMessage)}`;
    window.open(whatsappUrl, '_blank');
  }

  const whatsappDirectUrl = `https://wa.me/917002808115?text=${encodeURIComponent("Hello Pranab Milan Gogoi, I need urgent flood relief assistance.")}`;

  return (
    <div className="appointment-page-wrapper">
      <Breadcrumb currentPage="Request Assistance" />

      {/* Main Section (2-Column Full Width Container) */}
      <section className="appointment-main-section">
        <div className="appointment-main-container">

          <div className="appointment-grid-layout">

            {/* Left Column: Form Card */}
            <div className="appointment-form-card">
              <form onSubmit={handleSubmit}>

                {/* 1. Your Details */}
                <div className="form-section-card">
                  <span className="form-section-title">1. Your Details</span>

                  <div className="form-field-grid">
                    <div className="form-field-group">
                      <label htmlFor="patientName" className="form-label">Full Name *</label>
                      <input
                        type="text"
                        id="patientName"
                        name="patientName"
                        className="form-input"
                        placeholder="e.g. Ananya Das"
                        value={formData.patientName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="phone" className="form-label">WhatsApp / Mobile Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-input"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="age" className="form-label">Age (Years)</label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        className="form-input"
                        placeholder="e.g. 32"
                        value={formData.age}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="gender" className="form-label">Gender</label>
                      <select
                        id="gender"
                        name="gender"
                        className="form-select"
                        value={formData.gender}
                        onChange={handleChange}
                      >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="form-field-group full-width">
                      <label htmlFor="location" className="form-label">Village / Area *</label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        className="form-input"
                        placeholder="e.g. Chandan Nagar, Deochora, etc."
                        value={formData.location}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Type of Need */}
                <div className="form-section-card">
                  <span className="form-section-title">2. What Kind Of Help Do You Need?</span>

                  <div className="form-field-grid">
                    <div className="form-field-group">
                      <label htmlFor="concern" className="form-label">Type of Need *</label>
                      <select
                        id="concern"
                        name="concern"
                        className="form-select"
                        value={formData.concern}
                        onChange={handleChange}
                      >
                        <option value="Emergency Ration & Water">Emergency Ration & Water</option>
                        <option value="Medical Relief">Medical Relief Camp</option>
                        <option value="Shelter Kit">Shelter Kit (Tarpaulin, Blankets)</option>
                        <option value="Maternal & Child Support">Maternal & Child Support</option>
                        <option value="Rescue / Evacuation">Rescue / Evacuation</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="mode" className="form-label">Delivery Preference</label>
                      <select
                        id="mode"
                        name="mode"
                        className="form-select"
                        value={formData.mode}
                        onChange={handleChange}
                      >
                        <option value="Home / Village Delivery">Home / Village Delivery (boat / road)</option>
                        <option value="Collection Point Pickup">Collection Point Pickup (Deochora)</option>
                      </select>
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="preferredDate" className="form-label">Preferred Date</label>
                      <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        className="form-input"
                        value={formData.preferredDate}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="timeSlot" className="form-label">Preferred Time Slot</label>
                      <select
                        id="timeSlot"
                        name="timeSlot"
                        className="form-select"
                        value={formData.timeSlot}
                        onChange={handleChange}
                      >
                        <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                        <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                        <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
                      </select>
                    </div>

                    <div className="form-field-group full-width">
                      <label htmlFor="notes" className="form-label">Brief Description of Situation</label>
                      <textarea
                        id="notes"
                        name="notes"
                        rows="4"
                        className="form-textarea"
                        placeholder="Number of family members, water level, access issues..."
                        value={formData.notes}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn-submit-appointment">
                  <FaClipboardList />
                  <span>Send Relief Request</span>
                </button>

              </form>
            </div>

            {/* Right Column: Emergency SOS Sidebar Card */}
            <div className="appointment-sidebar-card">
              <span className="sidebar-sos-badge">URGENT SOS HELPLINE</span>
              <h3 className="sidebar-sos-title">Immediate Emergency Assistance</h3>
              <p className="sidebar-sos-desc">
                For urgent life-safety, boat rescue, or emergency ration dispatch, contact our lead coordinator directly.
              </p>

              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sidebar-emergency-btn"
              >
                <FaWhatsapp size={18} />
                <span>Message Coordinator on WhatsApp</span>
              </a>

              <div className="sidebar-sos-info-list">
                <div className="sidebar-info-item">
                  <FaPhone className="sidebar-info-icon" />
                  <div>
                    <strong>Direct Call Hotline:</strong><br />
                    <a href="tel:7002808115" style={{ color: 'var(--primary)', fontWeight: '800', textDecoration: 'none' }}>
                      Pranab Milan Gogoi (+91 7002808115)
                    </a>
                  </div>
                </div>

                <div className="sidebar-info-item">
                  <FaTruckFast className="sidebar-info-icon" />
                  <div>
                    <strong>Ground & Boat Dispatch:</strong><br />
                    Active boat units for submerged villages across Assam.
                  </div>
                </div>

                <div className="sidebar-info-item">
                  <FaShieldHalved className="sidebar-info-icon" />
                  <div>
                    <strong>100% Verified Support:</strong><br />
                    Direct distribution with transparent logging.
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  )
}
