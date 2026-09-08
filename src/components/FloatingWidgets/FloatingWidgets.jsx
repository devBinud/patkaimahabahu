import { FaWhatsapp, FaPhone } from 'react-icons/fa6'
import './FloatingWidgets.css'

export default function FloatingWidgets() {
  const whatsappNumber = "917002808115";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Pranab Milan Gogoi, I would like to offer relief materials / support for the Assam flood drive.")}`;
  const phoneUrl = "tel:7002808115";

  return (
    <aside className="floating-widgets-stack" aria-label="Quick Contact Actions">
      {/* Direct Call Button */}
      <a
        href={phoneUrl}
        className="floating-btn call-btn"
        title="Call +91 70028 08115"
        aria-label="Call +91 70028 08115"
      >
        <FaPhone size={18} />
      </a>

      {/* Direct WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp-btn"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={22} />
      </a>
    </aside>
  )
}
