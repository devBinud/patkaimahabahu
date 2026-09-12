import { Link } from 'react-router-dom'
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
  FaWhatsapp,
  FaLinkedinIn,
  FaCheck,
  FaArrowUpRightFromSquare,
  FaHashtag
} from 'react-icons/fa6'
import breadcrumbsBg from '../assets/breadcrumbs_bg.jpg'
import './SocialMediaPage.css'

export default function SocialMediaPage() {
  const socialChannels = [
    {
      id: 'fb',
      name: 'Facebook',
      handle: '@patkaimahabahufoundation',
      link: 'https://facebook.com',
      badge: 'Official Community Page',
      icon: FaFacebookF,
      themeClass: 'theme-facebook',
      followers: '15.4K+ Followers',
      btnText: 'Follow on Facebook',
      desc: 'Ground photo albums, live village distribution broadcasts, and community updates from our flood relief coordinators across Assam.'
    },
    {
      id: 'insta',
      name: 'Instagram',
      handle: '@patkaimahabahu_foundation',
      link: 'https://instagram.com',
      badge: 'Field Stories & Reels',
      icon: FaInstagram,
      themeClass: 'theme-instagram',
      followers: '8.2K+ Followers',
      btnText: 'Follow on Instagram',
      desc: 'Visual ground stories, volunteer highlight reels, and daily dispatch carousels showing direct relief kit distribution in marooned villages.'
    },
    {
      id: 'yt',
      name: 'YouTube',
      handle: '@patkaimahabahufoundation',
      link: 'https://youtube.com',
      badge: 'Field Documentaries & News',
      icon: FaYoutube,
      themeClass: 'theme-youtube',
      followers: '4.6K+ Subscribers',
      btnText: 'Subscribe on YouTube',
      desc: 'In-depth relief drive video reports, volunteer field diaries, boat rescue footage, and ground interviews with flood-affected families.'
    },
    {
      id: 'wa',
      name: 'WhatsApp Channel & Helpline',
      handle: '+91 70028 08115',
      link: 'https://wa.me/917002808115?text=Hello%20Patkai%20Mahabahu%20Foundation%2C%20I%20would%20like%20to%20receive%20relief%20updates',
      badge: 'Instant Ground Alerts',
      icon: FaWhatsapp,
      themeClass: 'theme-whatsapp',
      followers: 'Direct 24/7 Helpline',
      btnText: 'Join WhatsApp Channel',
      desc: 'Instant alert network for real-time flood emergency needs, drop-off point coordination, volunteer calls, and immediate distress requests.'
    },
    {
      id: 'x',
      name: 'X (Twitter)',
      handle: '@patkaimahabahu',
      link: 'https://twitter.com',
      badge: 'Live Bulletins',
      icon: FaXTwitter,
      themeClass: 'theme-x',
      followers: '3.1K+ Followers',
      btnText: 'Follow on X',
      desc: 'Fast-paced ground updates, public alerts, tagging district administrations, and daily accounting figures during peak flood rescue drives.'
    },
    {
      id: 'li',
      name: 'LinkedIn',
      handle: 'patkai-mahabahu-foundation',
      link: 'https://linkedin.com',
      badge: 'CSR & Institutional',
      icon: FaLinkedinIn,
      themeClass: 'theme-linkedin',
      followers: 'Institutional Network',
      btnText: 'Connect on LinkedIn',
      desc: 'Corporate social responsibility (CSR) tie-ups, healthcare alliances, structured rehabilitation programs, and annual governance disclosures.'
    }
  ]

  const officialHashtags = [
    '#PatkaiMahabahu',
    '#AssamFloodRelief2026',
    '#GroundReliefSewa',
    '#FloodWarriorsAssam',
    '#EveryLifeMatters',
    '#SewaInAction',
    '#UpperAssamRelief'
  ]

  return (
    <div className="social-media-page">
      {/* Hero Header with Background Image from assets/bg */}
      <section
        className="social-hero-section"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0, 24, 42, 0.86) 0%, rgba(0, 56, 88, 0.82) 100%), url(${breadcrumbsBg})`
        }}
      >
        <div className="social-hero-container">
          <h1 className="social-hero-title">Patkai Social Media</h1>
          <p className="social-hero-subtitle">
            Follow and join Patkai Mahabahu Foundation across our verified social channels for live field dispatches, real-time rescue coordinates, daily photo reports, and volunteer mobilization.
          </p>
        </div>
      </section>

      {/* Main Grid Content */}
      <div className="social-content-wrapper">
        <div className="social-main-container">

          {/* SECTION 1: All Social Channels */}
          <section className="social-section-block">
            <div className="social-section-header">
              <h2 className="social-section-title">
                Official Foundation <span className="social-title-highlight">Social Media Handles</span>
              </h2>
            </div>

            <div className="social-cards-grid">
              {socialChannels.map((item) => {
                const IconComponent = item.icon
                return (
                  <div key={item.id} className={`social-card ${item.themeClass}`}>
                    <div className="social-card-top">
                      <div className="social-card-icon-wrap">
                        <IconComponent size={24} />
                      </div>
                      <div className="social-card-titles">
                        <div className="social-card-name-row">
                          <h3 className="social-card-platform">{item.name}</h3>
                          <span className="verified-badge" title="Official Verified Handle">
                            <FaCheck size={10} />
                          </span>
                        </div>
                        <span className="social-card-handle">{item.handle}</span>
                      </div>
                    </div>

                    <p className="social-card-desc">{item.desc}</p>

                    <div className="social-card-meta">
                      <span className="social-followers-pill">{item.followers}</span>
                      <span className="social-badge-pill">{item.badge}</span>
                    </div>

                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-card-btn"
                    >
                      <span>{item.btnText}</span>
                      <FaArrowUpRightFromSquare size={13} />
                    </a>
                  </div>
                )
              })}
            </div>
          </section>

          {/* SECTION 2: Campaign Hashtags & Community Banner */}
          <section className="hashtags-banner-card">
            <div className="hashtags-content">
              <div className="hashtags-badge">
                <FaHashtag size={14} />
                <span>OFFICIAL CAMPAIGN HASHTAGS</span>
              </div>
              <h3 className="hashtags-title">Help Us Amplify Relief Work Across Social Media</h3>
              <p className="hashtags-desc">
                When sharing relief photos, donating, or volunteering with Patkai Mahabahu Foundation, use these official hashtags to help displaced families and coordinators connect faster:
              </p>
              <div className="hashtags-list">
                {officialHashtags.map((tag, idx) => (
                  <span key={idx} className="hashtag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="hashtags-cta-box">
              <span className="cta-box-sub">Want to Volunteer or Share Field Updates?</span>
              <h4 className="cta-box-title">Join Our Ground Support Volunteers</h4>
              <div className="cta-box-actions">
                <Link to="/contact" className="btn-cta-contact">
                  Register as Volunteer
                </Link>
                <Link to="/contribution" className="btn-cta-donate">
                  Contribute Now
                </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
