import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
// Leadership & Advisory Images
import pranabImg from '../../assets/pranab.jpeg'
import sunilImg from '../../assets/team/sunil_kr_bania.jpeg'
import nripenImg from '../../assets/team/nripen_das.jpeg'
import mousumiImg from '../../assets/team/mousumi_boruah.jpeg'
import jayantaImg from '../../assets/team/jayanta_patar.jpeg'
import arpitaImg from '../../assets/team/arpita_dhar.jpeg'
import ashokImg from '../../assets/team/ashok_ranjan_borah.jpeg'

// Ground Team Images
import kalpanaImg from '../../assets/team/kalpana_gogoi.png'
import samarjitImg from '../../assets/team/samarjit_bora.jpeg'
import utpalImg from '../../assets/team/utpal_gogoi.jpeg'
import poojaImg from '../../assets/team/pooja_borpatragohain.jpeg'
import manashProtimImg from '../../assets/team/manash_protim_gogoi.jpeg'
import mungsengImg from '../../assets/team/mun_chengpha_gogoi.jpeg'
import nirajImg from '../../assets/team/kumar_niroj_jyoti_gogoi.jpeg'
import dixitImg from '../../assets/team/dixit_subham_chetia.jpeg'
import horenImg from '../../assets/team/horen_dutta.jpeg'
import sauravImg from '../../assets/team/saurav_jyoti_gogoi.jpeg'
import parinitaImg from '../../assets/team/parinita_bhuyan.jpeg'
import prachurjyaImg from '../../assets/team/prachurjya_protim_gogoi.jpeg'
import gargeeImg from '../../assets/team/gargee_gogoi.jpeg'
import dimpleImg from '../../assets/team/dimple_baruah.jpeg'
import jogeshImg from '../../assets/team/jogesh_ojha.jpeg'
import shankurajImg from '../../assets/team/shankuraj_konwar.jpg'
import urmilaImg from '../../assets/team/urmila_baruah.jpeg'
import krisanubaruahImg from '../../assets/team/krishanu_aruah.jpeg'

// Medical & Audit Images
import sudiptaImg from '../../assets/team/suddipta_kumar_bora.jpeg'
import arindamImg from '../../assets/team/arindam_lahkar.jpeg'
import abinashImg from '../../assets/team/abhinash_dutta.jpeg'
import rohitImg from '../../assets/team/rohit_douglas.jpeg'
import parthajeetImg from '../../assets/team/parthajeet_chutia.jpeg'
import vivekImg from '../../assets/team/vivek_das.jpeg'

// Engineering, Tech & Communications Images
import manikImg from '../../assets/team/manik_chandra_gogoi.jpeg'
import babulImg from '../../assets/team/babul.jpeg'
import amlanjitImg from '../../assets/team/amlanjit_chetia.jpeg'
import amlanKashyapImg from '../../assets/team/amlan_kashyap.jpeg'
import binudImg from '../../assets/team/binud_panging.png'
import prabirImg from '../../assets/team/prabir_baruah.jpeg'
import gourangonImg from '../../assets/team/gourangon_gogoi.jpeg'
import plabonImg from '../../assets/team/plabon_mouchum_saikia.jpeg'
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

  // 1. Advisor Panel (Placed before Founder & Leadership)
  const advisorMembers = [
    {
      id: 'adv-1',
      name: 'Nripen Das, P.Eng. (APEGA)',
      designation: [
        'Chief Mechanical Engineer',
        'Worley Canada Services Ltd.',
        'Edmonton, AB, Canada'
      ],
      image: nripenImg
    },
    {
      id: 'adv-2',
      name: 'Dr. Maushumi Barooah',
      designation: [
        'Professor, Assam Engineering College, Guwahati Assam',
        'Former Director, Technical Education, Govt. of Assam',
        'Alumni from IIT Guwahati'
      ],
      image: mousumiImg
    },
    {
      id: 'adv-3',
      name: 'Jayanta Patar',
      designation: [
        'Ex-Chief General Manager, ONGCL',
        'Ex-President-CWC, All India ONGC OBC&MOBC Employees Welfare Association',
        'Ex-Vice President-CWC, ONGC Officers Association (ASTO)'
      ],
      image: jayantaImg
    },
    {
      id: 'adv-4',
      name: 'Urmila Baruah',
      designation: [
        'Management Trainer & HR Consultant',
        'Visiting Faculty, Gauhati University',
        'Ex-IOCL (20 Years) | Chevening Scholar (UK)'
      ],
      image: urmilaImg
    },
    {
      id: 'adv-5',
      name: 'Utpal Gogoi',
      designation: 'Engineer, PSU',
      image: utpalImg
    }
  ]

  // 2. Founder & Executive Leadership
  const founderMember = {
    id: 'pranab',
    name: 'Pranab Milan Gogoi',
    designation: 'Founder-Chairman',
    image: pranabImg
  }

  // Public Relations Officer & Administration
  const proMember = {
    id: 'sunil',
    name: 'Sunil Kumar Bania',
    designation: [
      'Public Relations Officer (PRO)',
      'Indian Navy Veteran',
      'Head - Security Services (प्रमुख- सुरक्षा सेवा)',
      'National Institute of Design, Assam (राष्ट्रीय डिज़ाईन संस्थान, असम)',
      'Vill. Tocklai, Rajabari, Jorhat (Assam) 785 014'
    ],
    image: sunilImg
  }

  // 3. Legal Advisors
  const legalMembers = [
    {
      id: 'la-1',
      name: 'Arpita Dhar',
      designation: 'Senior Advocate',
      image: arpitaImg
    },
    {
      id: 'la-2',
      name: 'Ashok Ranjan Bora',
      designation: 'Legal Advisor',
      image: ashokImg
    }
  ]

  // 4. Flood Relief Specific Teams
  const floodReliefSections = [
    {
      id: 'ground',
      title: 'Ground Team at Flood Relief',
      subtitle: 'Field coordinators and volunteers delivering relief materials directly into flood-affected villages.',
      members: [
        { id: 'g-1', name: 'Pallabi Rajkumari', designation: 'Ground Relief Coordinator', image: null },
        { id: 'g-2', name: 'Kalpana Gogoi', designation: 'Ground Relief Coordinator', image: kalpanaImg },
        { id: 'g-4', name: 'Samarjit Bora', designation: 'Ground Relief Coordinator', image: samarjitImg },
        { id: 'g-6', name: 'Pooja Borpatragohain', designation: 'Ground Relief Coordinator', image: poojaImg },
        { id: 'g-7', name: 'Manash Pratim Gogoi', designation: 'Ground Relief Coordinator', image: manashProtimImg },
        { id: 'g-8', name: 'Mun Chengpha Gogoi (Mungseng)', designation: 'Ground Relief Coordinator', image: mungsengImg },
        { id: 'g-9', name: 'Kumar Niroj Jyoti Gogoi (Niraj)', designation: 'Ground Relief Coordinator', image: nirajImg },
        { id: 'g-10', name: 'Krisanu Baruah', designation: 'Ground Relief Coordinator', image: krisanubaruahImg },
        { id: 'g-11', name: 'Dixit Subham Chetia', designation: 'Ground Relief Coordinator', image: dixitImg },
        { id: 'g-12', name: 'Dhon & Team', designation: 'Ground Volunteer Team', image: null },
        { id: 'g-13', name: 'Horen Dutta (Bhaikon)', designation: 'Ground Relief Coordinator', image: horenImg },
        { id: 'g-14', name: 'Saurav Jyoti Gogoi', designation: 'Ground Relief Coordinator', image: sauravImg },
        { id: 'g-15', name: 'Parineeta Bhuyan', designation: 'Ground Relief Coordinator', image: parinitaImg },
        { id: 'g-16', name: 'Prachurjya Protim Gogoi', designation: 'Ground Relief Coordinator', image: prachurjyaImg },
        { id: 'g-17', name: 'Gargee Gogoi', designation: 'Ground Relief Coordinator', image: gargeeImg },
        { id: 'g-18', name: 'Dimple Baruah', designation: 'Ground Relief Coordinator', image: dimpleImg },
        {
          id: 'g-19',
          name: 'Jogesh Ojha',
          designation: [
            'Senior Staff Reporter',
            'Dainik Agradoot, Jorhat'
          ],
          image: jogeshImg
        },
        { id: 'g-20', name: 'Shankuraj Konwar', designation: 'Ground Relief Coordinator', image: shankurajImg },
        { id: 'g-22', name: 'Pranjal Jyoti Borbora', designation: 'Ground Relief Coordinator', image: null }
      ]
    },
    {
      id: 'medical',
      title: 'Medical Team',
      subtitle: 'Healthcare volunteers and medical responders conducting relief health camps across affected areas.',
      members: [
        { id: 'm-1', name: 'Manash Borgohain', designation: 'Medical Relief', image: null },
        { id: 'm-2', name: 'Hiteswar Saikia', designation: 'Medical Team Member', image: null },
        {
          id: 'm-3',
          name: 'Suddipta Kumar Bora',
          designation: [
            'Assistant Professor, Dept. of Community Medicine',
            'Jorhat Medical College'
          ],
          image: sudiptaImg
        },
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
        { id: 'a-1', name: 'Arindam Lahkar', designation: 'Audit & Accounts ', image: arindamImg },
        { id: 'a-2', name: 'Abinash Dutta', designation: 'Audit Team Member', image: abinashImg },
        { id: 'a-3', name: 'Rohit Douglas', designation: 'Audit Team Member', image: rohitImg },
        { id: 'a-4', name: 'Kalpana Gogoi', designation: 'Audit Team Member', image: kalpanaImg },
        { id: 'a-5', name: 'Parthajeet Chutia', designation: 'Audit Team Member', image: parthajeetImg },
        { id: 'a-6', name: 'Vivek Das', designation: 'Audit Team Member', image: vivekImg }
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
          designation: [
            'Assistant Engineer',
            'Town & Country Planning, Dispur, Guwahati - 6'
          ],
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
        { id: 'sm-1', name: 'Gourangon Gogoi', designation: 'Social Media Cell', image: gourangonImg }
      ]
    },
    {
      id: 'transport',
      title: 'Transportation Team',
      subtitle: 'Vehicle, boat, and logistics drivers ensuring emergency supplies reach isolated remote locations.',
      members: [
        { id: 'tr-1', name: 'Biswajit Saikia', designation: 'Transportation ', image: null },
        { id: 'tr-2', name: 'Devid Mohan', designation: 'Transportation Team Member', image: null },
        { id: 'tr-3', name: 'Guddu', designation: 'Transportation Team Member', image: null }
      ]
    }
  ]

  // 5. Packaging & Community Support (Non-profile acknowledgment cards)
  const packagingCommunity = [
    {
      title: 'Respected Residents of Chandan Nagar, Club Road, Jorhat',
      role: 'Packaging & Ground Communication in Flood Relief'
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

      {/* 1. Advisor Panel Section (Placed before Founder & Leadership) */}
      <section className="about-advisors-section">
        <div className="about-team-container">
          <div className="department-group-header">
            <h3 className="department-group-title">Advisor Panel</h3>
            <p className="department-group-desc">
              Distinguished advisors providing strategic guidance, academic insight, and institutional support.
            </p>
          </div>

          <div className="about-team-grid">
            {advisorMembers.map((member) => (
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
                  {Array.isArray(member.designation) ? (
                    member.designation.map((line, idx) => (
                      <span key={idx} className={idx === 0 ? 'member-role' : 'member-role-sub'}>
                        {line}
                      </span>
                    ))
                  ) : (
                    <span className="member-role">{member.designation}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Founder & Leadership Section */}
      <section className="about-leadership-section">
        <div className="about-team-container">
          {/* Founder & Chairman (Top Div) */}
          <div className="leadership-subgroup">
            <div className="department-group-header">
              <h3 className="department-group-title">Founder & Chairman</h3>
              <p className="department-group-desc">
                Executive governance and institutional leadership steering the foundation and relief missions.
              </p>
            </div>

            <div className="about-team-grid">
              <div className="about-member-card">
                <div className="member-photo-frame">
                  <img
                    src={founderMember.image || defaultMemberImg}
                    alt={founderMember.name}
                    className="member-photo-img"
                  />
                </div>

                <div className="member-info-meta">
                  <p className="member-name">{founderMember.name}</p>
                  <span className="member-role">{founderMember.designation}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Public Relations Officer (Separate Bottom Div) */}
          <div className="leadership-subgroup" style={{ marginTop: '2.5rem' }}>
            <div className="department-group-header">
              <h3 className="department-group-title">Public Relations Officer</h3>
              <p className="department-group-desc">
                Public communications, institutional liaison, and veteran outreach.
              </p>
            </div>

            <div className="about-team-grid">
              <div className="about-member-card">
                <div className="member-photo-frame">
                  <img
                    src={proMember.image || defaultMemberImg}
                    alt={proMember.name}
                    className="member-photo-img"
                  />
                </div>

                <div className="member-info-meta">
                  <p className="member-name">{proMember.name}</p>
                  {Array.isArray(proMember.designation) ? (
                    proMember.designation.map((line, idx) => (
                      <span key={idx} className={idx === 0 ? 'member-role' : 'member-role-sub'}>
                        {line}
                      </span>
                    ))
                  ) : (
                    <span className="member-role">{proMember.designation}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Legal Advisors Section */}
      <section className="about-legal-section">
        <div className="about-team-container">
          <div className="department-group-header">
            <h3 className="department-group-title">Legal Advisors</h3>
            <p className="department-group-desc">
              Legal counsel and statutory compliance advisory ensuring governance, integrity, and ethical standards.
            </p>
          </div>

          <div className="about-team-grid">
            {legalMembers.map((member) => (
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
                  {Array.isArray(member.designation) ? (
                    member.designation.map((line, idx) => (
                      <span key={idx} className={idx === 0 ? 'member-role' : 'member-role-sub'}>
                        {line}
                      </span>
                    ))
                  ) : (
                    <span className="member-role">{member.designation}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The Team Specially for Flood Relief Drive Section */}
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
                        {Array.isArray(member.designation) ? (
                          member.designation.map((line, idx) => (
                            <span key={idx} className={idx === 0 ? 'member-role' : 'member-role-sub'}>
                              {line}
                            </span>
                          ))
                        ) : (
                          <span className="member-role">{member.designation}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* 5. Packaging & Overall Communication in Flood Relief */}
            <div className="department-group-block">
              <div className="department-group-header">
                <h3 className="department-group-title">Packaging & Overall Communication in Flood Relief</h3>
                <p className="department-group-desc">
                  Key coordination and community partners managing packaging, supply hubs, and field communication.
                </p>
              </div>

              <div className="about-team-grid" style={{ marginBottom: '1.75rem' }}>
                <div className="about-member-card">
                  <div className="member-photo-frame">
                    <img
                      src={plabonImg}
                      alt="Plabon Mouchum Saikia (Mejankari)"
                      className="member-photo-img"
                    />
                  </div>
                  <div className="member-info-meta">
                    <p className="member-name">Plabon Mouchum Saikia (Mejankari)</p>
                    <span className="member-role">Packaging & Overall Communication Coordination</span>
                  </div>
                </div>
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
