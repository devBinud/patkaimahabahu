import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
  FaWhatsapp,
  FaLinkedinIn
} from 'react-icons/fa6'
import checklistIcon from '../assets/icons/checklist.png'
import './SocialMediaPage.css'

export default function SocialMediaPage() {
  const socialChannels = [
    {
      id: 'fb',
      name: 'Facebook',
      handle: '@patkaimahabahufoundation',
      link: 'https://facebook.com',
      icon: FaFacebookF,
      themeClass: 'theme-facebook',
      btnText: 'Follow on Facebook',
      desc: 'Ground photo albums, live village distribution broadcasts, and community updates from our flood relief coordinators across Assam.'
    },
    {
      id: 'insta',
      name: 'Instagram',
      handle: '@patkaimahabahu_foundation',
      link: 'https://instagram.com',
      icon: FaInstagram,
      themeClass: 'theme-instagram',
      btnText: 'Follow on Instagram',
      desc: 'Visual ground stories, volunteer highlight reels, and daily dispatch carousels showing direct relief kit distribution in marooned villages.'
    },
    {
      id: 'yt',
      name: 'YouTube',
      handle: '@patkaimahabahufoundation',
      link: 'https://youtube.com',
      icon: FaYoutube,
      themeClass: 'theme-youtube',
      btnText: 'Subscribe on YouTube',
      desc: 'In-depth relief drive video reports, volunteer field diaries, boat rescue footage, and ground interviews with flood-affected families.'
    },
    {
      id: 'wa',
      name: 'WhatsApp Channel & Helpline',
      handle: '+91 70028 08115',
      link: 'https://wa.me/917002808115?text=Hello%20Patkai%20Mahabahu%20Foundation%2C%20I%20would%20like%20to%20receive%20relief%20updates',
      icon: FaWhatsapp,
      themeClass: 'theme-whatsapp',
      btnText: 'Join WhatsApp Channel',
      desc: 'Instant alert network for real-time flood emergency needs, drop-off point coordination, volunteer calls, and immediate distress requests.'
    },
    {
      id: 'x',
      name: 'X (Twitter)',
      handle: '@patkaimahabahu',
      link: 'https://twitter.com',
      icon: FaXTwitter,
      themeClass: 'theme-x',
      btnText: 'Follow on X',
      desc: 'Fast-paced ground updates, public alerts, tagging district administrations, and daily accounting figures during peak flood rescue drives.'
    },
    {
      id: 'li',
      name: 'LinkedIn',
      handle: 'patkai-mahabahu-foundation',
      link: 'https://linkedin.com',
      icon: FaLinkedinIn,
      themeClass: 'theme-linkedin',
      btnText: 'Connect on LinkedIn',
      desc: 'Corporate social responsibility (CSR) tie-ups, healthcare alliances, structured rehabilitation programs, and annual governance disclosures.'
    }
  ]

  return (
    <div className="social-media-page">
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
                          <img
                            src={checklistIcon}
                            alt="Verified"
                            className="verified-badge-img"
                            title="Official Verified Handle"
                          />
                        </div>
                        <span className="social-card-handle">{item.handle}</span>
                      </div>
                    </div>

                    <p className="social-card-desc">{item.desc}</p>

                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pmf-btn pmf-btn-outline"
                    >
                      <span>{item.btnText}</span>
                      <span className="pmf-btn-icon">↗</span>
                    </a>
                  </div>
                )
              })}
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
