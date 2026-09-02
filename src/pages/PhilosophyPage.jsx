import { useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
import { FaChevronDown, FaHandHoldingHeart, FaCircleQuestion } from 'react-icons/fa6'
import './PhilosophyPage.css'

export default function PhilosophyPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I know my contribution actually reaches a family?",
      assamese: "আপুনি দিয়া বস্তু বা টকা সঁচাকৈ প্ৰয়োজনীয় পৰিয়াললৈকে পাইছেনে বুলি কেনেকৈ জানিব? আমাৰ প্ৰতিটো সংগ্ৰহ আৰু বিতৰণ Live Relief Dashboard-ত খোলাভাৱে তালিকাভুক্ত কৰা হয়, যাতে যিকোনো লোকে ইয়াক পৰীক্ষা কৰিব পাৰে।",
      english: "Every item and rupee received is logged openly on our Live Relief Dashboard, and our ground team photographs and records each village dispatch. Nothing is distributed without being tracked back to the original pledge."
    },
    {
      question: "Can I provide relief materials without visiting the drop-off point myself?",
      assamese: "নিজে গৈ নথৈ ৰিলিফ সামগ্ৰী দিব পাৰিমনে? হয়, আপুনি WhatsApp-ৰ জৰিয়তে আমাৰ সংগঠকৰ সৈতে যোগাযোগ কৰিব পাৰি আৰু সংগ্ৰহৰ ব্যৱস্থা কৰিব পাৰি।",
      english: "Yes. Message our ground coordinator on WhatsApp and we can arrange pickup for larger contributions, or you can drop items at the Deochora collection point any day between 9 AM and 7 PM."
    },
    {
      question: "How can a flood-affected family request help?",
      assamese: "বানপানীত ক্ষতিগ্ৰস্ত হোৱা পৰিয়ালে কেনেকৈ সহায় বিচাৰিব পাৰে? 'Request Relief Assistance' ফৰ্মটো পূৰণ কৰক বা পোনপটীয়াকৈ আমাৰ সংগঠকক ফোন কৰক, আমাৰ টিমে যিমান সোনকালে পাৰি সেই অঞ্চললৈ যাব।",
      english: "Fill out the Request Relief Assistance form, or call our ground coordinator directly. Our team verifies the need and prioritizes dispatch to the most urgent and hard-to-reach areas first."
    },
    {
      question: "What relief categories does the foundation currently focus on?",
      assamese: "আমাৰ ড্ৰাইভে মূলতঃ জৰুৰীকালীন ৰেচন আৰু পানী, চিকিৎসা সহায়, আশ্ৰয় সামগ্ৰী, মাতৃ আৰু শিশু সহায়, আৰু দীৰ্ঘমেয়াদী পুনৰ্বাসনৰ ওপৰত গুৰুত্ব দিয়ে।",
      english: "We currently focus on emergency ration & clean water, medical relief camps, temporary shelter kits, maternal & child support, and long-term rehabilitation for the hardest-hit households."
    },
    {
      question: "Can I volunteer with the ground team instead of donating materials?",
      assamese: "মই বস্তু নিদি স্বেচ্ছাসেৱক হিচাপে কাম কৰিব পাৰিমনে? নিশ্চয়, আমাক নাও চলোৱা, বিতৰণ আৰু প্যাকিঙত সহায় কৰিব পৰা স্থানীয় স্বেচ্ছাসেৱকৰ প্ৰয়োজন। আমাৰ সংগঠকক WhatsApp-ত যোগাযোগ কৰক।",
      english: "Absolutely! We need local volunteers to help with boat runs, distribution and packing kits at the collection point. Message our ground coordinator on WhatsApp to join the roster."
    }
  ];

  return (
    <div className="philosophy-page-wrapper">
      <Breadcrumb currentPage="FAQs & Transparency" parentPage="About Us" parentLink="/about" />

      {/* Main Section */}
      <section className="philosophy-main-section">
        <div className="philosophy-main-container">
          
          <div className="faq-list-container">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className={`faq-item-card ${isOpen ? 'open' : ''}`}>
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="faq-question-btn"
                  >
                    <span className="faq-question-text">
                      <FaCircleQuestion className="faq-icon-question" />
                      {faq.question}
                    </span>
                    <FaChevronDown className="faq-arrow-icon" />
                  </button>

                  {isOpen && (
                    <div className="faq-answer-block">
                      <p className="faq-assamese-text">
                        {faq.assamese}
                      </p>
                      <p className="faq-english-text">
                        {faq.english}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="faq-help-box">
            <h3 className="faq-help-title">Have more questions?</h3>
            <p className="faq-help-desc">
              Speak directly with our Founder-Chairman Pranab Milan Gogoi.
            </p>
            <Link to="/contact" className="btn-hero-primary">
              <FaHandHoldingHeart /> <span>Get In Touch</span>
            </Link>
          </div>

        </div>
      </section>
    </div>
  )
}
