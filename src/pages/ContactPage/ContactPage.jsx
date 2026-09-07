import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import {
  FaPhone,
  FaLocationDot,
  FaWhatsapp,
  FaClock,
  FaHandHoldingHeart,
  FaEnvelope
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

          {/* Clean Header */}
          <div className="contact-page-header">
            <h1 className="contact-page-title">Contact & Ground Coordination</h1>
            <p className="contact-page-subtitle">
              Reach out directly to our field coordinators, relief drop-off point, and emergency volunteer desk across Assam.
            </p>
          </div>

          <div className="contact-layout-split">
            {/* Left: Contact Info (Clean, open, modern editorial layout) */}
            <div className="contact-info-panel">
              <div className="contact-touchpoints-list">
                {/* Phone */}
                <div className="contact-touchpoint">
                  <div className="touchpoint-icon-wrap">
                    <FaPhone />
                  </div>
                  <div className="touchpoint-details">
                    <span className="touchpoint-label">Direct Helpline</span>
                    <a href="tel:+917002808115" className="touchpoint-value-link">
                      +91 70028 08115
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="contact-touchpoint">
                  <div className="touchpoint-icon-wrap icon-whatsapp">
                    <FaWhatsapp />
                  </div>
                  <div className="touchpoint-details">
                    <span className="touchpoint-label">WhatsApp Ground Desk</span>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="touchpoint-value-link">
                      +91 70028 08115 (Click to Chat)
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-touchpoint">
                  <div className="touchpoint-icon-wrap">
                    <FaEnvelope />
                  </div>
                  <div className="touchpoint-details">
                    <span className="touchpoint-label">Official Email</span>
                    <a href="mailto:patkaimahabahufoundation@gmail.com" className="touchpoint-value-link">
                      patkaimahabahufoundation@gmail.com
                    </a>
                  </div>
                </div>

                {/* Drop-off Point */}
                <div className="contact-touchpoint">
                  <div className="touchpoint-icon-wrap">
                    <FaLocationDot />
                  </div>
                  <div className="touchpoint-details">
                    <span className="touchpoint-label">Central Drop-Off Point</span>
                    <p className="touchpoint-value-text">
                      Deochora, Nearby Lane 10, Chandan Nagar Club Road, Assam 781001
                    </p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="contact-touchpoint">
                  <div className="touchpoint-icon-wrap">
                    <FaClock />
                  </div>
                  <div className="touchpoint-details">
                    <span className="touchpoint-label">Operating Hours</span>
                    <p className="touchpoint-value-text">
                      Every day: 9:00 AM – 7:00 PM <span className="touchpoint-note">(Call ahead for large vehicle deliveries)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Action Panel */}
            <div className="contact-action-panel">
              <div className="contact-action-top">
                <h3 className="contact-action-title">Get Involved With The Ground Team</h3>
                <p className="contact-action-desc">
                  If your household or community requires emergency relief supplies, medical aid, or immediate support, connect directly with our ground volunteers below.
                </p>
              </div>

              <div className="contact-action-buttons">
                <Link to="/appointment" className="btn-contact-action btn-action-teal">
                  <span>Request Relief Assistance</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
