import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
import floodReliefImg from '../assets/whatwedo/flood_relief.jpeg'
import educationImg from '../assets/whatwedo/education.jpg'
import environmentImg from '../assets/whatwedo/environment.jpg'
import projectHomeImg from '../assets/whatwedo/project_home.jpg'
import healthcareImg from '../assets/whatwedo/healthcare.jpg'
import logoImg from '../assets/logo.png'
import './SpecialtiesPage.css'

export default function SpecialtiesPage() {
  const whatWeDoCards = [
    {
      id: 1,
      number: '1',
      title: 'Flood Relief Drive',
      image: floodReliefImg,
      description: 'Emergency food rations, clean drinking water, rescue boat operations, and essential medical supplies delivered door-to-door in flood-affected and submerged remote villages across Assam.',
      link: '/contribution'
    },
    {
      id: 2,
      number: '2',
      title: 'Education',
      image: educationImg,
      description: 'Empowering children and youth through educational scholarships, literacy drives, school infrastructure support, and learning continuity kits in marginalized and crisis-impacted communities.',
      link: '/education'
    },
    {
      id: 3,
      number: '3',
      title: 'Environment',
      image: environmentImg,
      description: 'Dedicated conservation initiatives, extensive tree plantations, wetland and floodplain preservation, and community-led climate resilience to safeguard Assam’s unique natural ecosystems.',
      link: '/environment'
    },
    {
      id: 4,
      number: '4',
      title: 'Project Home',
      image: projectHomeImg,
      description: 'Rebuilding lives through flood-resilient raised stilt housing, comprehensive structural engineering assessments, and long-term rehabilitation for families displaced by severe river erosion.',
      link: '/project-home'
    },
    {
      id: 5,
      number: '5',
      title: 'Healthcare',
      image: healthcareImg,
      description: 'We believe quality healthcare is vital for every community. We conduct free medical health camps, distribute preventive medicines, and deploy emergency health workers to curb waterborne epidemics.',
      link: '/healthcare'
    }
  ]

  return (
    <div className="rf-whatwedo-page">
      <Breadcrumb currentPage="What We Do" />

      {/* Main 2-Column Section Matching Reliance Foundation Design */}
      <section className="rf-whatwedo-section">
        <div className="rf-whatwedo-container">
          {/* Section Header */}
          <div className="rf-whatwedo-header">
            <h1 className="rf-whatwedo-main-title">What We Do</h1>
            <p className="rf-whatwedo-main-desc">
              Discover our core initiatives and humanitarian programs dedicated to uplifting communities, delivering flood relief, enabling education, conserving ecosystems, building flood-resilient homes, and advancing healthcare across Assam.
            </p>
          </div>

          <div className="rf-whatwedo-grid">
            {whatWeDoCards.map((card) => (
              <article key={card.id} className="rf-whatwedo-card">
                {/* Image Banner with Bottom-Right Logo Watermark */}
                <div className="rf-whatwedo-media">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="rf-whatwedo-img"
                    loading="lazy"
                  />
                  <div className="rf-card-logo-badge">
                    <img
                      src={logoImg}
                      alt="Patkai Mahabahu Foundation"
                      className="rf-card-logo-img"
                    />
                  </div>
                </div>

                {/* Content Area */}
                <div className="rf-whatwedo-content">
                  <h2 className="rf-whatwedo-title">
                    {card.number}. {card.title}
                  </h2>
                  <p className="rf-whatwedo-desc">{card.description}</p>
                  
                  <div className="rf-whatwedo-action">
                    <Link to={card.link} className="rf-whatwedo-btn">
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
