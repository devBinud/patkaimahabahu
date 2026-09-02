import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
import { FaBoxOpen, FaDroplet, FaTent, FaStethoscope, FaBaby, FaHandHoldingHeart } from 'react-icons/fa6'

export default function SpecialtiesPage() {
  return (
    <div className="specialties-page-wrapper">
      <Breadcrumb currentPage="Our Focus Areas" />

      <div className="section" style={{ marginTop: '2.5rem' }}>
        <div className="specialty-grid" style={{ marginBottom: '3rem', maxWidth: '1240px', margin: '0 auto 3rem' }}>
          <div className="specialty-card">
            <div className="specialty-icon-box">
              <FaBoxOpen />
            </div>
            <h3>Emergency Ration & Food Kits</h3>
            <p>
              Rice, pulses, oil and dry rations packed into family kits and distributed door-to-door in flood-affected villages, including areas reachable only by boat.
            </p>
          </div>

          <div className="specialty-card">
            <div className="specialty-icon-box">
              <FaStethoscope />
            </div>
            <h3>Medical Relief Camps</h3>
            <p>
              Free healthcare consultations and essential medicines for communities cut off from regular medical access during the floods.
            </p>
          </div>

          <div className="specialty-card">
            <div className="specialty-icon-box">
              <FaDroplet />
            </div>
            <h3>Clean Water & Hygiene Kits</h3>
            <p>
              Water purification supplies, soap, sanitary pads and disinfectants to prevent post-flood disease outbreaks.
            </p>
          </div>

          <div className="specialty-card">
            <div className="specialty-icon-box">
              <FaTent />
            </div>
            <h3>Temporary Shelter Kits</h3>
            <p>
              Tarpaulins, mats and blankets for families whose homes have been damaged or submerged by floodwaters.
            </p>
          </div>

          <div className="specialty-card">
            <div className="specialty-icon-box">
              <FaBaby />
            </div>
            <h3>Maternal & Child Support</h3>
            <p>
              Baby food, nutrition supplies and dedicated care for expecting mothers and young children in relief camps.
            </p>
          </div>

          <div className="specialty-card">
            <div className="specialty-icon-box">
              <FaHandHoldingHeart />
            </div>
            <h3>Rehabilitation Relief Fund</h3>
            <p>
              Long-term rebuilding support for the hardest-hit households once immediate flood relief needs are met.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
