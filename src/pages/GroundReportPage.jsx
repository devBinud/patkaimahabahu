import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
import {
  FaPhone,
  FaTruckFast,
  FaShieldHalved,
  FaChevronRight
} from 'react-icons/fa6'
import hero1 from '../assets/gallery/1.jpeg'
import hero2 from '../assets/gallery/2.jpeg'
import hero3 from '../assets/gallery/3.jpeg'
import './GroundReportPage.css'

export default function GroundReportPage() {
  return (
    <div className="ground-report-wrapper">
      <Breadcrumb currentPage="Ground Dispatch Report" parentPage="Impact" parentLink="/ground-report" />

      {/* Main Content Section */}
      <section className="ground-main-section">
        <div className="ground-main-container">

          <div className="ground-content-card">

            {/* Story Photos Grid */}
            <div className="ground-photos-grid">
              <div className="ground-photo-frame">
                <img src={hero3} alt="Boat relief distribution" className="ground-photo-img" />
              </div>
              <div className="ground-photo-frame">
                <img src={hero1} alt="Ration distribution" className="ground-photo-img" />
              </div>
              <div className="ground-photo-frame">
                <img src={hero2} alt="Medical relief camp" className="ground-photo-img" />
              </div>
            </div>

            {/* Narrative & Highlights */}
            <div className="ground-narrative-grid">
              <div className="ground-narrative-box">
                <div className="ground-narrative-header">
                  <FaTruckFast className="ground-narrative-icon" />
                  <h3 className="ground-narrative-title">Direct Household Delivery</h3>
                </div>
                <p className="ground-narrative-text">
                  Our team of dedicated volunteers led by ground coordinator Pranab Milan Gogoi navigates remote rivers and submerged roads to deliver rice, clean drinking water, baby food, tarpaulins, and emergency medical care directly into the hands of affected villagers.
                </p>
              </div>

              <div className="ground-narrative-box">
                <div className="ground-narrative-header">
                  <FaShieldHalved className="ground-narrative-icon" />
                  <h3 className="ground-narrative-title">Live Open Tracking</h3>
                </div>
                <p className="ground-narrative-text">
                  Every rupee donated and every bag of relief material contributed by the public is tracked with 100% transparency on our Live Relief Dashboard, ensuring complete integrity and community trust.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  )
}
