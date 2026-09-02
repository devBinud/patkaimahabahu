import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import {
  FaPhone,
  FaLocationDot,
  FaWhatsapp,
  FaClock,
  FaHandHoldingHeart,
  FaTruckFast,
  FaChevronRight
} from 'react-icons/fa6'
import './ContactPage.css'

export default function ContactPage() {
  const whatsappNumber = "917002808115";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Pranab Milan Gogoi, I would like to know more about the Assam Flood Relief Drive.")}`;

  return (
    <div className="contact-page-wrapper">
      <Breadcrumb currentPage="Contact Us" />

      {/* Main Section */}
      <section className="contact-main-section">
        <div className="contact-main-container">

          <div className="contact-grid-layout">

            {/* Left Column: Contact Details Card */}
            <div className="contact-details-card">
              <h2 className="contact-org-title">Patkai Mahabahu Foundation</h2>
              <p className="contact-lead-name">Pranab Milan Gogoi and team</p>

              <div className="contact-info-list">
                {/* 1. Drop-off Point */}
                <div className="contact-info-item">
                  <div className="contact-info-icon-box">
                    <FaLocationDot />
                  </div>
                  <div>
                    <span className="contact-info-label">Drop-off Point Address</span>
                    <span className="contact-info-text">
                      House Name: Deochora, Nearby Lane 10, Chandan Nagar Club Road, Assam
                    </span>
                  </div>
                </div>

                {/* 2. Direct Phone Line */}
                <div className="contact-info-item">
                  <div className="contact-info-icon-box">
                    <FaPhone />
                  </div>
                  <div>
                    <span className="contact-info-label">Direct Phone Line</span>
                    <a href="tel:+917002808115" className="contact-info-link">
                      +91 70028 08115
                    </a>
                  </div>
                </div>

                {/* 3. WhatsApp Coordination */}
                <div className="contact-info-item">
                  <div className="contact-info-icon-box">
                    <FaWhatsapp />
                  </div>
                  <div>
                    <span className="contact-info-label">WhatsApp Coordination</span>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="contact-info-link">
                      +91 70028 08115
                    </a>
                  </div>
                </div>

                {/* 4. Drop-off Hours */}
                <div className="contact-info-item">
                  <div className="contact-info-icon-box">
                    <FaClock />
                  </div>
                  <div>
                    <span className="contact-info-label">Drop-off Operating Hours</span>
                    <span className="contact-info-text">
                      Every day: 9:00 AM to 7:00 PM <br />
                      <small style={{ color: '#64748b' }}>(Call ahead for large vehicle deliveries)</small>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Action Sidebar Card */}
            <div className="contact-sidebar-card">
              <div className="contact-sidebar-top">
                <span className="sidebar-action-tag">NEED SUPPORT OR WANT TO HELP?</span>
                <h3 className="sidebar-action-title">Get Involved With The Ground Team</h3>
                <p className="sidebar-action-desc">
                  If your household requires emergency relief supplies or if you wish to contribute materials, select an action below to get in direct touch with our volunteers.
                </p>
              </div>

              <div className="sidebar-cta-stack">
                <Link to="/appointment" className="btn-hero-primary">
                  <FaHandHoldingHeart />
                  <span>Request Relief Assistance</span>
                  <FaChevronRight size={14} />
                </Link>
                <Link to="/contribution" className="btn-hero-secondary">
                  <FaTruckFast />
                  <span>Provide Relief Materials</span>
                  <FaChevronRight size={14} />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  )
}
