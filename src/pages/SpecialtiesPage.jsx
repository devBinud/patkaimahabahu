import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
import {
  PackageOpen,
  Stethoscope,
  Droplets,
  Tent,
  Baby,
  HandHeart
} from 'lucide-react'
import './SpecialtiesPage.css'

export default function SpecialtiesPage() {
  const focusCards = [
    {
      id: 'ration',
      icon: <PackageOpen size={26} strokeWidth={1.8} />,
      title: 'Emergency Ration & Food Kits',
      description: 'Rice, pulses, oil and dry rations packed into family kits and distributed door-to-door in flood-affected villages, including areas reachable only by boat.'
    },
    {
      id: 'medical',
      icon: <Stethoscope size={26} strokeWidth={1.8} />,
      title: 'Medical Relief Camps',
      description: 'Free healthcare consultations and essential medicines for communities cut off from regular medical access during the floods.'
    },
    {
      id: 'water',
      icon: <Droplets size={26} strokeWidth={1.8} />,
      title: 'Clean Water & Hygiene Kits',
      description: 'Water purification supplies, soap, sanitary pads and disinfectants to prevent post-flood disease outbreaks.'
    },
    {
      id: 'shelter',
      icon: <Tent size={26} strokeWidth={1.8} />,
      title: 'Temporary Shelter Kits',
      description: 'Tarpaulins, mats and blankets for families whose homes have been damaged or submerged by floodwaters.'
    },
    {
      id: 'maternal',
      icon: <Baby size={26} strokeWidth={1.8} />,
      title: 'Maternal & Child Support',
      description: 'Baby food, nutrition supplies and dedicated care for expecting mothers and young children in relief camps.'
    },
    {
      id: 'rehab',
      icon: <HandHeart size={26} strokeWidth={1.8} />,
      title: 'Rehabilitation Relief Fund',
      description: 'Long-term rebuilding support for the hardest-hit households once immediate flood relief needs are met.'
    }
  ]

  return (
    <div className="specialties-page-wrapper">
      <Breadcrumb currentPage="Our Focus Areas" />

      <div className="specialties-main-section">
        <div className="specialties-container">
          <div className="specialty-grid">
            {focusCards.map(card => (
              <div key={card.id} className="specialty-card">
                <div className="specialty-icon-box">
                  {card.icon}
                </div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
