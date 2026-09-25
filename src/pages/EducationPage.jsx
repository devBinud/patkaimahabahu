import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
import educationImg from '../assets/education.jpg'
import './InnerInfoPage.css'

export default function EducationPage() {
  return (
    <div className="inner-info-page">
      <Breadcrumb currentPage="Education" parentPage="What We Do" parentLink="/specialties" />

      <section className="inner-info-section">
        <div className="inner-info-container">
          <div className="inner-info-image-wrapper">
            <img
              src={educationImg}
              alt="Education initiatives"
              className="inner-info-featured-img"
            />
          </div>

          <p className="inner-info-text">
            We are working on this page. Content is currently under construction.
          </p>
        </div>
      </section>
    </div>
  )
}
