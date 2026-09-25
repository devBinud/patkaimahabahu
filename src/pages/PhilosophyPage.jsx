import { useState } from 'react'
import Breadcrumb from '../components/Breadcrumb/Breadcrumb'
import { FaChevronDown } from 'react-icons/fa6'
import './PhilosophyPage.css'

export default function PhilosophyPage() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I know my contribution actually reaches a family?",
      answer: "Every item and rupee received is logged openly on our Live Relief Dashboard, and our ground team photographs and records each village dispatch. Nothing is distributed without being tracked back to the original pledge."
    },
    {
      question: "Can I provide relief materials without visiting the drop-off point myself?",
      answer: "Yes. Message our ground coordinator on WhatsApp and we can arrange pickup for larger contributions, or you can drop items at the Deochora collection point any day between 9 AM and 7 PM."
    },
    {
      question: "How can a flood-affected family request help?",
      answer: "Fill out the Request Relief Assistance form, or call our ground coordinator directly. Our team verifies the need and prioritizes dispatch to the most urgent and hard-to-reach areas first."
    },
    {
      question: "What relief categories does the foundation currently focus on?",
      answer: "We currently focus on emergency ration & clean water, medical relief camps, temporary shelter kits, maternal & child support, and long-term rehabilitation for the hardest-hit households."
    },
    {
      question: "Can I volunteer with the ground team instead of donating materials?",
      answer: "Absolutely! We need local volunteers to help with boat runs, distribution and packing kits at the collection point. Message our ground coordinator on WhatsApp to join the roster."
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
                      <span className="faq-badge-q">Q</span>
                      {faq.question}
                    </span>
                    <FaChevronDown className="faq-arrow-icon" />
                  </button>

                  {isOpen && (
                    <div className="faq-answer-block">
                      <p className="faq-answer-text">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
