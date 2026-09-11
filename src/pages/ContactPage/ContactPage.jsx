import { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import {
  FaLocationDot,
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaRotate,
  FaCircleCheck,
  FaSpinner
} from 'react-icons/fa6';
import './ContactPage.css';

const SUPABASE_URL = 'https://ckzyqhbzymoxzuwemwrw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_O5vOV7LGac3nZ3dr_QTdqw_6EKmOSRb';
const INQUIRIES_TABLE = 'pmf_inquiries';

export default function ContactPage() {
  const whatsappNumber = '917002808115';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hello Patkai Mahabahu Foundation, I would like to get in touch.'
  )}`;

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
    captchaInput: ''
  });

  // Math Captcha State
  const [captchaProblem, setCaptchaProblem] = useState({ a: 4, b: 7 });
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 8) + 2;
    const b = Math.floor(Math.random() * 8) + 1;
    setCaptchaProblem({ a, b });
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields marked with an asterisk (*).');
      return;
    }

    if (!formData.interest) {
      setStatus('error');
      setErrorMessage('Please select an Area of Interest.');
      return;
    }

    // Captcha validation
    if (parseInt(formData.captchaInput, 10) !== captchaProblem.a + captchaProblem.b) {
      setStatus('error');
      setErrorMessage('Incorrect verification answer. Please try again.');
      generateCaptcha();
      setFormData((prev) => ({ ...prev, captchaInput: '' }));
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const newInquiry = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      subject: formData.interest,
      message: formData.message.trim(),
      status: 'Pending',
      source: 'contact_page_form',
      created_at: new Date().toISOString()
    };

    // 2. Save in local browser storage (instant fallback)
    try {
      const stored = JSON.parse(localStorage.getItem('pmf_inquiries') || '[]');
      stored.unshift({
        id: Date.now(),
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        ...newInquiry
      });
      localStorage.setItem('pmf_inquiries', JSON.stringify(stored));
    } catch (err) {
      console.warn('Local storage write:', err);
    }

    // 3. Post to Supabase cloud table
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/${INQUIRIES_TABLE}`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation'
        },
        body: JSON.stringify(newInquiry)
      });
    } catch (err) {
      console.warn('Supabase post inquiry:', err);
    }

    // Success response
    setStatus('success');
    setFormData({
      name: '',
      email: '',
      phone: '',
      interest: '',
      message: '',
      captchaInput: ''
    });
    generateCaptcha();
  };

  return (
    <div className="contact-page-wrapper">
      <Breadcrumb currentPage="Contact Us" />

      <section className="contact-main-section">
        <div className="contact-main-container">

          {/* Main Editorial Header (Matching Reliance Foundation Reference) */}
          <div className="contact-page-header">
            <h1 className="contact-main-heading">Contact Us</h1>
            <p className="contact-intro-text">
              For any enquiries or information, drop us an e-mail or contact us
            </p>
          </div>

          {/* 1. CONTACT ADDRESS CARD (Matching Screenshot 2) */}
          <div className="contact-card contact-address-card">
            <h2 className="contact-card-title">Contact Address</h2>

            <div className="contact-address-content">
              {/* Address */}
              <div className="contact-address-row">
                <FaLocationDot className="contact-row-icon icon-pin" />
                <p className="contact-address-text">
                  Deochora, Nearby Lane 10, Chandan Nagar Club Road, Assam 781001
                </p>
              </div>

              {/* General Queries Email */}
              <div className="contact-queries-block">
                <span className="queries-label">For any general queries, email us</span>
                <a
                  href="mailto:patkaimahabahufoundation@gmail.com"
                  className="queries-email-link"
                >
                  <FaEnvelope className="email-icon" />
                  <span>patkaimahabahufoundation@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* 2. GET IN TOUCH FORM CARD (Matching Screenshot 3 & 4) */}
          <div className="contact-card contact-form-card">
            <h2 className="contact-card-title form-card-title">Get In Touch</h2>

            {status === 'success' && (
              <div className="contact-success-banner" role="alert">
                <div>
                  <p>Thank you for reaching out!</p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="contact-error-banner" role="alert">
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <div className="contact-form-grid">
                {/* Name */}
                <div className="contact-form-group">
                  <label htmlFor="contact-name">
                    Name <span className="req">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Email */}
                <div className="contact-form-group">
                  <label htmlFor="contact-email">
                    Email <span className="req">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                {/* Contact No. */}
                <div className="contact-form-group">
                  <label htmlFor="contact-phone">
                    Contact No. <span className="req">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>

                {/* Area of Interest */}
                <div className="contact-form-group">
                  <label htmlFor="contact-interest">
                    Area Of Interest <span className="req">*</span>
                  </label>
                  <div className="select-wrapper">
                    <select
                      id="contact-interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select area of interest</option>
                      <option value="Disaster Management Support">Disaster Management Support</option>
                      <option value="Education">Education</option>
                      <option value="Environment">Environment</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Rebuilding Homes">Rebuilding Homes</option>
                    </select>
                  </div>
                </div>

                {/* Message (Full Width) */}
                <div className="contact-form-group full-width">
                  <label htmlFor="contact-message">
                    Message <span className="req">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message, relief inquiry, or volunteering request here..."
                    required
                  />
                </div>

                {/* Human Verification Challenge */}
                <div className="contact-form-group captcha-group">
                  <label htmlFor="contact-captcha">
                    Security Verification: What is {captchaProblem.a} + {captchaProblem.b}? <span className="req">*</span>
                  </label>
                  <div className="captcha-input-row">
                    <input
                      id="contact-captcha"
                      name="captchaInput"
                      type="number"
                      value={formData.captchaInput}
                      onChange={handleChange}
                      placeholder="Enter sum"
                      required
                    />
                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="captcha-refresh-btn"
                      title="New challenge"
                      tabIndex={-1}
                    >
                      <FaRotate />
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="contact-form-submit-row">
                <button
                  type="submit"
                  className="contact-submit-btn"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? (
                    <span className="btn-loading-flex">
                      <FaSpinner className="spin-icon" /> SUBMITTING...
                    </span>
                  ) : (
                    'SUBMIT'
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}
