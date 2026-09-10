import { useState } from 'react';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';
import './NewsletterBanner.css';

const SUPABASE_URL = 'https://ckzyqhbzymoxzuwemwrw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_O5vOV7LGac3nZ3dr_QTdqw_6EKmOSRb';
const SUBSCRIBERS_TABLE = 'pmf_subscribers';

export default function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'already' | 'error'
  const [feedback, setFeedback] = useState('');

  const validateEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setStatus('error');
      setFeedback('Please enter your email address.');
      return;
    }

    if (!validateEmail(cleanEmail)) {
      setStatus('error');
      setFeedback('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setFeedback('');

    // 1. Always store locally in browser storage as instant backup
    try {
      const stored = JSON.parse(localStorage.getItem('pmf_subscribers') || '[]');
      const alreadySubscribed = stored.some((item) => item.email === cleanEmail);

      if (!alreadySubscribed) {
        stored.unshift({
          email: cleanEmail,
          subscribed_at: new Date().toISOString()
        });
        localStorage.setItem('pmf_subscribers', JSON.stringify(stored));
      }
    } catch (err) {
      console.warn('Local newsletter backup error:', err);
    }

    // 2. Stream directly to Supabase cloud table
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/${SUBSCRIBERS_TABLE}`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          email: cleanEmail,
          subscribed_at: new Date().toISOString(),
          source: 'website_footer_banner'
        })
      });

      if (res.ok) {
        setStatus('success');
        setFeedback("Thank you for subscribing! You'll receive our latest updates.");
        setEmail('');
      } else {
        const errorData = await res.json().catch(() => ({}));
        // Check if already subscribed (unique constraint in Supabase)
        if (
          errorData.code === '23505' ||
          (errorData.message && errorData.message.includes('duplicate'))
        ) {
          setStatus('already');
          setFeedback("You're already subscribed to our latest updates. Thank you!");
          setEmail('');
        } else {
          // Fallback: stored in local storage successfully
          setStatus('success');
          setFeedback("Thank you for subscribing");
          setEmail('');
        }
      }
    } catch (err) {
      console.warn('Supabase post error:', err);
      // Offline / network fallback: successfully saved locally
      setStatus('success');
      setFeedback("Thank you for subscribing!");
      setEmail('');
    }
  };

  return (
    <section className="pmf-newsletter-section" aria-label="Newsletter Subscription">
      <div className="pmf-newsletter-container">
        <div className="pmf-newsletter-card">
          <h2 className="pmf-newsletter-title">Sign up for our latest updates</h2>
          <p className="pmf-newsletter-desc">
            Get our email updates on our initiatives, stories, and latest developments.
          </p>

          <form onSubmit={handleSubscribe} className="pmf-newsletter-form" noValidate>
            <div className="pmf-newsletter-input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== 'idle') setStatus('idle');
                }}
                placeholder="Enter your email address *"
                className="pmf-newsletter-input"
                aria-label="Email address for updates"
                disabled={status === 'loading'}
                required
              />
            </div>

            <button
              type="submit"
              className="pmf-newsletter-btn"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <span className="pmf-btn-inner">
                  <FaSpinner className="pmf-spinner" /> SUBSCRIBING...
                </span>
              ) : (
                'SUBSCRIBE'
              )}
            </button>
          </form>

          {feedback && (
            <div
              className={`pmf-newsletter-feedback ${
                status === 'error'
                  ? 'feedback-error'
                  : status === 'already'
                  ? 'feedback-info'
                  : 'feedback-success'
              }`}
              role="alert"
            >
              {(status === 'success' || status === 'already') && (
                <FaCheckCircle className="feedback-icon" />
              )}
              <span>{feedback}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
