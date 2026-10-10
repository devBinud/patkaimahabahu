import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
import './PrivacyPolicyPage.css'

export default function PrivacyPolicyPage() {
  return (
    <div className="privacy-page-wrapper">
      <Breadcrumb currentPage="Privacy Policy" />

      <section className="privacy-content-section">
        <div className="privacy-container">
          <header className="privacy-header">
            <h1 className="privacy-title">Privacy Policy</h1>
            <p className="privacy-updated">Last Updated: October 2026 &bull; Patkai Mahabahu Foundation</p>
          </header>

          <div className="privacy-body">
            <div className="privacy-block">
              <h2 className="privacy-section-title">1. Introduction</h2>
              <p className="privacy-p">
                Patkai Mahabahu Foundation is committed to safeguarding the privacy and personal information of our donors, volunteers, beneficiaries, and website visitors. This Privacy Policy explains how we collect, use, and protect your information when you interact with our website and humanitarian programs.
              </p>
            </div>

            <div className="privacy-block">
              <h2 className="privacy-section-title">2. Information We Collect</h2>
              <p className="privacy-p">
                We only collect information necessary to coordinate relief missions and process community contributions:
              </p>
              <ul className="privacy-list">
                <li>
                  <strong>Contact Details:</strong> Name, phone number, email address, and postal address submitted via our contact or volunteer forms.
                </li>
                <li>
                  <strong>Relief Assistance Requests:</strong> Location, household emergency requirements, and family details submitted for disaster relief coordination.
                </li>
                <li>
                  <strong>Donation &amp; Contribution Records:</strong> Transaction reference IDs, contribution amount, donor name, and contact details for official donation receipts and transparency records. We do not store sensitive payment card details or banking credentials on our servers.
                </li>
              </ul>
            </div>

            <div className="privacy-block">
              <h2 className="privacy-section-title">3. How We Use Your Information</h2>
              <p className="privacy-p">
                The information we gather is used solely for the fulfillment of our charitable and humanitarian objectives:
              </p>
              <ul className="privacy-list">
                <li>Delivering emergency ration kits, clean drinking water, and rehabilitation materials to flood-affected families.</li>
                <li>Issuing official acknowledgements and receipts for voluntary donations.</li>
                <li>Responding to inquiries, partnership proposals, and volunteer sign-ups.</li>
                <li>Maintaining public audit and contribution accountability records in compliance with applicable trust laws.</li>
              </ul>
            </div>

            <div className="privacy-block">
              <h2 className="privacy-section-title">4. Information Sharing &amp; Protection</h2>
              <p className="privacy-p">
                We value your trust. Patkai Mahabahu Foundation does not sell, rent, trade, or share your personal information with any third-party marketing companies. Personal data is accessible strictly to authorized coordinators and administrators solely for relief execution and compliance reporting.
              </p>
            </div>

            <div className="privacy-block">
              <h2 className="privacy-section-title">5. Donor Privacy &amp; Anonymity</h2>
              <p className="privacy-p">
                We respect the wishes of our donors. If you prefer your contribution to remain anonymous on our public donor registry or transparency reports, please notify us during or immediately after your donation, and your name will be displayed as an Anonymous Well-wisher.
              </p>
            </div>

            <div className="privacy-block">
              <h2 className="privacy-section-title">6. Contact &amp; Grievance Redressal</h2>
              <p className="privacy-p">
                If you have questions, corrections, or concerns regarding your personal data or this Privacy Policy, please get in touch with our team:
              </p>
              <div className="privacy-contact-box">
                <p><strong>Patkai Mahabahu Foundation</strong></p>
                <p>Email: <a href="mailto:contact@patkaimahabahu.org">contact@patkaimahabahu.org</a></p>
                <p>Helpline / WhatsApp: <a href="tel:+917002808115">+91 70028 08115</a></p>
                <p>Address: Assam, India</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
