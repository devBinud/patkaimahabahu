import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import {
  FaQuoteLeft,
  FaPhone,
  FaEnvelope,
  FaAward,
  FaHeart,
  FaHandHoldingHeart,
  FaShieldHalved,
  FaArrowRight,
  FaLocationDot
} from 'react-icons/fa6'
import pranabImg from '../../assets/pranab.jpeg'
import './VisionPage.css'

export default function VisionPage() {
  return (
    <div className="vision-page-wrapper">
      <Breadcrumb currentPage="Chairman's Vision" parentPage="About Us" parentLink="/about" />

      {/* Main Vision Content Section */}
      <section className="vision-content-section">
        <div className="vision-container">

          <div className="vision-layout-grid">

            {/* Left Column: Chairman's Profile Card */}
            <div className="chairman-profile-sticky">
              <div className="chairman-card">
                <div className="chairman-avatar-frame">
                  <img src={pranabImg} alt="Pranab Milan Gogoi" className="chairman-avatar" />
                  <span className="chairman-verified-badge">✓ Founder-Chairman</span>
                </div>

                <div className="chairman-meta">
                  <h3 className="chairman-name">Pranab Milan Gogoi</h3>
                  <span className="chairman-title">Founder & Chairman</span>
                  <span className="chairman-org">Patkai Mahabahu Foundation</span>
                </div>

                <div className="chairman-contact-info">
                  <a href="tel:7002808115" className="chairman-contact-row">
                    <FaPhone className="contact-icon" />
                    <span>+91 70028 08115</span>
                  </a>
                  <div className="chairman-contact-row">
                    <FaLocationDot className="contact-icon" />
                    <span>Jorhat / Guwahati, Assam</span>
                  </div>
                </div>

                <div className="chairman-card-cta">
                  <Link to="/contribution" className="btn-chairman-support">
                    <FaHeart />
                    <span>Support Our Mission</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Vision Message */}
            <div className="vision-message-body">

              {/* Callout Quote */}
              <div className="vision-featured-quote">
                <FaQuoteLeft className="quote-giant-icon" />
                <p className="quote-text">
                  &ldquo;Our pledge is simple: no village left behind, no family left unassisted in times of crisis, and every child provided with the dignity of education and shelter.&rdquo;
                </p>
                <span className="quote-author">— Pranab Milan Gogoi</span>
              </div>

              {/* Message Paragraphs */}
              <div className="vision-prose">
                <h2>Dear Friends, Donors, and Well-Wishers,</h2>

                <p>
                  Assam is a land of unmatched beauty, culture, and resilience. Yet, every monsoon, our communities face the immense fury of devastating floods that submerge homes, destroy standing crops, wash away roads, and displace hundreds of thousands of innocent families into emergency relief shelters.
                </p>

                <p>
                  Having witnessed the ground realities firsthand across remote riverine villages and char areas, I recognized a critical gap: relief often arrives late, distribution lacks transparency, and long-term rebuilding of damaged homes is frequently overlooked.
                </p>

                <p>
                  <strong>Patkai Mahabahu Foundation</strong> was born out of this singular conviction — that humanitarian aid must be <strong>immediate, direct, and completely accountable</strong>. We do not operate from distant offices; our dedicated ground volunteer network reaches submerged areas by boat, tractor, and on foot to deliver aid directly into the hands of affected families.
                </p>

                <h3>Our 4 Core Pillars of Action</h3>

                <div className="vision-pillars-grid">
                  <div className="vision-pillar-box">
                    <div className="pillar-box-icon"><FaShieldHalved /></div>
                    <h4>100% Transparent Ground Sewa</h4>
                    <p>Every rupee and relief item donated is recorded openly on our Live Relief Dashboard, ensuring unmatched donor trust and traceability.</p>
                  </div>

                  <div className="vision-pillar-box">
                    <div className="pillar-box-icon"><FaHandHoldingHeart /></div>
                    <h4>Beyond Relief to Rebuilding</h4>
                    <p>We do not stop at emergency ration kits. We conduct rigorous damage assessments to provide tin sheets, bamboo, and structural materials to restore broken homes.</p>
                  </div>

                  <div className="vision-pillar-box">
                    <div className="pillar-box-icon"><FaAward /></div>
                    <h4>Educational Scholarships for the Needy</h4>
                    <p>We are deeply committed to sponsoring bright students from economically weaker sections and flood-hit families so their education is never cut short.</p>
                  </div>

                  <div className="vision-pillar-box">
                    <div className="pillar-box-icon"><FaHeart /></div>
                    <h4>Community Resilience & Dignity</h4>
                    <p>Building long-term self-reliance through healthcare camps, women empowerment initiatives, and village-level disaster preparedness networks.</p>
                  </div>
                </div>

                <h3>A Joint Call to Serve</h3>
                <p>
                  True social change is never the work of a single individual; it is the collective empathy of citizens coming together to uplift those in need. I humbly invite you to join hands with Patkai Mahabahu Foundation — whether by contributing relief goods, sponsoring a family&apos;s rehabilitation, or volunteering with our ground teams.
                </p>

                <p>
                  Together, we can build a resilient, empowered Assam where every family stands strong, no matter how high the waters rise.
                </p>

                <div className="chairman-signature-block">
                  <div className="signature-text">
                    <span className="sign-with-warmth">With warm regards & sewa,</span>
                    <strong className="sign-name">Pranab Milan Gogoi</strong>
                    <span className="sign-role">Founder-Chairman, Patkai Mahabahu Foundation</span>
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
