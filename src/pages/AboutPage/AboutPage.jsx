import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import pranabImg from '../../assets/pranab.jpeg'
import sunilImg from '../../assets/team/sunil_kr_bania.jpeg'
import ashokImg from '../../assets/team/ashok_ranjan_borah.jpeg'
import amlanKashyapImg from '../../assets/team/amlan_kashyap.jpeg'
import binudImg from '../../assets/team/binud_panging.png'
import prabirImg from '../../assets/team/prabir_baruah.jpeg'
import amlanjitImg from '../../assets/team/amlanjit_chetia.jpeg'
import gourangonImg from '../../assets/team/gourangon_gogoi.jpeg'
import manikImg from '../../assets/team/manik_chandra_gogoi.jpeg'
import babulImg from '../../assets/team/babul.jpeg'
import defaultMemberImg from '../../assets/team/default.jpg'
import './AboutPage.css'

export default function AboutPage() {
  const getInitials = (name) => {
    if (!name) return 'PM'
    const parts = name.replace(/[^a-zA-Z0-9\s]/g, '').trim().split(/\s+/).filter(Boolean)
    if (parts.length === 0) return 'PM'
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }

  // 1. Founder & Executive Leadership
  const leadershipMembers = [
    {
      id: 'pranab',
      name: 'Pranab Milan Gogoi',
      designation: 'Founder-Chairman',
      image: pranabImg
    },
    {
      id: 'sunil',
      name: 'Sunil Kumar Bania',
      designation: 'Public Relations Officer (PRO)',
      image: sunilImg
    }
  ]

  // 2. Flood Relief Specific Teams
  const floodReliefSections = [
    {
      id: 'ground',
      title: 'Ground Team at Flood Relief',
      subtitle: 'Field coordinators and volunteers delivering relief materials directly into flood-affected villages.',
      members: [
        { id: 'g-1', name: 'Pallabi Rajkumari', designation: 'Ground Relief Coordinator', image: null },
        { id: 'g-2', name: 'Kalpana Gogoi', designation: 'Ground Relief Coordinator', image: null },
        { id: 'g-3', name: 'Ashok Ranjan Bora', designation: 'Ground Relief Coordinator', image: ashokImg },
        { id: 'g-4', name: 'Samarjit Bora', designation: 'Ground Relief Coordinator', image: null },
        { id: 'g-5', name: 'Utpal Gogoi', designation: 'Ground Relief Coordinator', image: null },
        { id: 'g-6', name: 'Pooja Borpatragohain', designation: 'Ground Relief Coordinator', image: null },
        { id: 'g-7', name: 'Manash Pratim Gogoi', designation: 'Ground Relief Coordinator', image: null },
        { id: 'g-8', name: 'Mungseng', designation: 'Ground Relief Coordinator', image: null },
        { id: 'g-9', name: 'Niraj Gogoi', designation: 'Ground Relief Coordinator', image: null },
        { id: 'g-10', name: 'Krisanu Baruah', designation: 'Ground Relief Coordinator', image: null },
        { id: 'g-11', name: 'Dixit Subham Chetia', designation: 'Ground Relief Coordinator', image: null },
        { id: 'g-12', name: 'Dhon & Team', designation: 'Ground Volunteer Team', image: null },
        { id: 'g-13', name: 'Horen Dutta (Bhaikon)', designation: 'Ground Relief Coordinator', image: null },
        { id: 'g-14', name: 'Sourabh Gogoi', designation: 'Ground Relief Coordinator', image: null },
        { id: 'g-15', name: 'Parineeta Bhuyan', designation: 'Ground Relief Coordinator', image: null },
        { id: 'g-16', name: 'Prachurjya', designation: 'Ground Relief Coordinator', image: null },
        { id: 'g-17', name: 'Gargee Gogoi', designation: 'Ground Relief Coordinator', image: null },
        { id: 'g-18', name: 'Dimple', designation: 'Ground Relief Coordinator', image: null },
        { id: 'g-19', name: 'Pranjal Jyoti Borbora', designation: 'Ground Relief Coordinator', image: null }
      ]
    },
    {
      id: 'medical',
      title: 'Medical Team',
      subtitle: 'Healthcare volunteers and medical responders conducting relief health camps across affected areas.',
      members: [
        { id: 'm-1', name: 'Manash Borgohain', designation: 'Medical Relief In-Charge', image: null },
        { id: 'm-2', name: 'Hiteswar Saikia', designation: 'Medical Team Member', image: null },
        { id: 'm-3', name: 'Sudipta Borah', designation: 'Medical Team Member', image: null },
        { id: 'm-4', name: 'Himanish Goswami', designation: 'Medical Team Member', image: null },
        { id: 'm-5', name: 'Bedanta Pathak', designation: 'Medical Team Member', image: null },
        { id: 'm-6', name: 'Rakki Saikia', designation: 'Medical Team Member', image: null }
      ]
    },
    {
      id: 'audit',
      title: 'Audit Team',
      subtitle: 'Dedicated audit committee ensuring complete transparency, inventory tracking, and accountability.',
      members: [
        { id: 'a-1', name: 'Arindam Lahkar', designation: 'Audit & Accounts In-Charge', image: null },
        { id: 'a-2', name: 'Abinash Dutta', designation: 'Audit Team Member', image: null },
        { id: 'a-3', name: 'Rohit Douglas', designation: 'Audit Team Member', image: null },
        { id: 'a-4', name: 'Kalpana Gogoi', designation: 'Audit Team Member', image: null },
        { id: 'a-5', name: 'Parthajeet Chutia', designation: 'Audit Team Member', image: null },
        { id: 'a-6', name: 'Vivek Das', designation: 'Audit Team Member', image: null }
      ]
    },
    {
      id: 'project-home',
      title: 'Project Home Section',
      subtitle: 'Structural damage assessment, site engineering, and house rehabilitation for flood-affected families.',
      members: [
        {
          id: 'ph-advisor',
          name: 'Manik Chandra Gogoi',
          designation: 'Advisor (Retd. Executive Engineer, ASEB)',
          image: manikImg
        },
        {
          id: 'ph-architect',
          name: 'Babul Borgohain',
          designation: 'Chief Architect & Advisor',
          image: babulImg
        },
        {
          id: 'ph-1',
          name: 'Amlanjit Chetia',
          designation: 'Site Engineer (Project Home)',
          image: amlanjitImg
        }
      ]
    },
    {
      id: 'tech',
      title: 'Tech Team',
      subtitle: 'Digital infrastructure, real-time live dashboard development, and field monitoring systems.',
      members: [
        { id: 't-1', name: 'Amlan Kashyap', designation: 'IT Solutions Associate', image: amlanKashyapImg },
        { id: 't-2', name: 'Binud Panging', designation: 'IT Solutions Associate', image: binudImg },
        { id: 't-3', name: 'Prabir Baruah', designation: 'Professor, Electronics and Electrical Engineering, IIT Guwahati', image: prabirImg }
      ]
    },
    {
      id: 'social-media',
      title: 'Social Media Cell',
      subtitle: 'Managing digital outreach, verified field updates, photo documentation, and online coordination.',
      members: [
        { id: 'sm-1', name: 'Gourangon Gogoi', designation: 'Social Media Cell In-Charge', image: gourangonImg }
      ]
    },
    {
      id: 'transport',
      title: 'Transportation Team',
      subtitle: 'Vehicle, boat, and logistics drivers ensuring emergency supplies reach isolated remote locations.',
      members: [
        { id: 'tr-1', name: 'Biswajit Saikia', designation: 'Transportation In-Charge', image: null },
        { id: 'tr-2', name: 'Devid Mohan', designation: 'Transportation Team Member', image: null },
        { id: 'tr-3', name: 'Guddu', designation: 'Transportation Team Member', image: null }
      ]
    }
  ]

  // 3. Packaging & Community Support (Non-profile acknowledgment cards)
  const packagingCommunity = [
    {
      title: 'Respected Residents of Chandan Nagar, Club Road, Jorhat',
      role: 'Packaging & Ground Communication in Flood Relief'
    },
    {
      title: 'Plabon Mouchum Saikia (Mejankari)',
      role: 'Packaging & Overall Communication Coordination'
    }
  ]

  return (
    <div className="about-page-wrapper">
      <Breadcrumb currentPage="About Patkai Mahabahu" />

      {/* Main Mission Text Section (Left Aligned) */}
      <section className="about-intro-section">
        <div className="about-intro-container">
          <div className="about-intro-header-left">
            <h1 className="about-intro-title">About Patkai Mahabahu Foundation</h1>
            <p className="about-intro-desc">
              Patkai Mahabahu Foundation is a non-profit trust committed to humanitarian relief, education, disaster recovery, and sustainable community development across Assam.
            </p>
          </div>
        </div>
      </section>

      {/* 1. Founder & Leadership Section (First show the two images) */}
      <section className="about-leadership-section">
        <div className="about-team-container">
          <div className="department-group-header">
            <h3 className="department-group-title">Founder & Leadership</h3>
            <p className="department-group-desc">
              Executive governance and communications steering the foundation and relief missions.
            </p>
          </div>

          <div className="about-team-grid">
            {leadershipMembers.map((member) => (
              <div key={member.id} className="about-member-card">
                <div className="member-photo-frame">
                  <img
                    src={member.image || defaultMemberImg}
                    alt={member.name}
                    className="member-photo-img"
                  />
                </div>

                <div className="member-info-meta">
                  <p className="member-name">{member.name}</p>
                  <span className="member-role">{member.designation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. The Team Specially for Flood Relief Drive Section */}
      <section className="about-team-section">
        <div className="about-team-container">

          <div className="about-team-header-main">
            <h2 className="team-section-main-title">The Team Specially for Flood Relief Drive</h2>
            <p className="team-section-main-desc">
              Dedicated leadership, medical specialists, audit committee, tech engineers, transportation crew, and ground volunteers specifically mobilized for the Assam Flood Relief Drive.
            </p>
          </div>

          {/* Departmental Sections */}
          <div className="department-groups-container">
            {floodReliefSections.map((dept) => (
              <div key={dept.id} className="department-group-block">
                <div className="department-group-header">
                  <h3 className="department-group-title">{dept.title}</h3>
                  {dept.subtitle && (
                    <p className="department-group-desc">{dept.subtitle}</p>
                  )}
                </div>

                <div className="about-team-grid">
                  {dept.members.map((member) => (
                    <div key={member.id} className="about-member-card">
                      <div className="member-photo-frame">
                        <img
                          src={member.image || defaultMemberImg}
                          alt={member.name}
                          className="member-photo-img"
                        />
                      </div>

                      <div className="member-info-meta">
                        <p className="member-name">{member.name}</p>
                        <span className="member-role">{member.designation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* 3. Packaging & Overall Communication in Flood Relief (Clean Text List) */}
            <div className="department-group-block">
              <div className="department-group-header">
                <h3 className="department-group-title">Packaging & Overall Communication in Flood Relief</h3>
                <p className="department-group-desc">
                  Special acknowledgment to community hubs and partners who managed packaging and field communication.
                </p>
              </div>

              <div className="packaging-ack-list">
                {packagingCommunity.map((item, idx) => (
                  <div key={idx} className="packaging-ack-item">
                    <p className="packaging-ack-title">{item.title}</p>
                    <span className="packaging-ack-role">{item.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}
