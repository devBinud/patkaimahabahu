import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import './ObjectivesPage.css'

export default function ObjectivesPage() {
  const trustObjectives = [
    {
      id: 'i.',
      content:
        "To promote and undertake charitable activities in the fields of education, healthcare, post-flood rehabilitation and reconstruction of community infrastructure, agriculture, environmental protection and conservation, women's empowerment, livelihood generation, entrepreneurship, and skill development for the benefit of the public without prejudice to the generality of the foregoing, the Trust shall endeavour to eradicate illiteracy by establishing, supporting or assisting schools, educational institutions, literacy programmes and other educational initiatives. The Trust may also provide scholarships, financial assistance, educational materials, counselling, mentoring and other academic, moral and welfare support to deserving students belonging to economically weaker sections, socially disadvantaged communities and persons with disabilities (Divyangjan), enabling them to pursue education and realize their full potential."
    },
    {
      id: 'ii.',
      content:
        "To organize, promote and conduct seminars, workshops, conferences, training programmes, awareness campaigns, cultural activities, community outreach programmes and other charitable initiatives aimed at strengthening the intellectual, moral, ethical, social and humanitarian values of individuals, and to foster education, leadership, community participation and social responsibility for the overall welfare and sustainable development of society."
    },
    {
      id: 'iii.',
      content:
        "To provide free education, scholarships, tuition assistance, educational materials, hostel support and other educational facilities to deserving students from economically weaker sections, selected through a fair, transparent and objective process from schools, colleges, universities and other recognised educational institutions."
    },
    {
      id: 'iv.',
      content:
        "To provide relief, rehabilitation, financial assistance and livelihood support to economically weaker persons and families affected by floods and other natural disasters, particularly in the State of Assam, by adopting fair, transparent and objective criteria for identifying eligible beneficiaries. The Trust may also undertake the reconstruction of houses, community infrastructure and public utilities, and provide food, clothing, medicines, educational assistance, agricultural inputs and other essential relief measures."
    },
    {
      id: 'v.',
      content:
        "To promote the holistic and sustainable development of society by strengthening the capacity of individuals and communities through education, skill development, health awareness, disaster preparedness, environmental conservation, livelihood promotion and community empowerment, thereby enabling them to face adverse situations with resilience and to extend assistance to the poor, vulnerable and weaker sections of society."
    }
  ]

  return (
    <div className="objectives-page-wrapper">
      <Breadcrumb currentPage="Objective of Foundation" parentLink="/about" />

      {/* Main Objectives Section */}
      <section className="objectives-content-section">
        <div className="objectives-container">

          {/* Header Title */}
          <div className="objectives-header-block">
            <h1 className="objectives-doc-title">Objective of the trust</h1>
          </div>

          {/* Objectives List */}
          <div className="objectives-doc-list">
            {trustObjectives.map((item) => (
              <div key={item.id} className="objective-doc-item">
                <div className="objective-doc-bullet">
                  <span className="objective-letter">{item.id}</span>
                </div>
                <div className="objective-doc-text">
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  )
}
