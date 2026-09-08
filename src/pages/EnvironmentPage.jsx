import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
import './InnerInfoPage.css'

export default function EnvironmentPage() {
  return (
    <div className="inner-info-page">
      <Breadcrumb currentPage="Environment" parentPage="What We Do" parentLink="/specialties" />

      <section className="inner-info-section">
        <div className="inner-info-container">
          <p className="inner-info-text">
            We are working on this page. Content is currently under construction.
          </p>
        </div>
      </section>
    </div>
  )
}
