import { FaWhatsapp, FaPhone } from 'react-icons/fa6'
import './FloatingWidgets.css'

export default function FloatingWidgets() {
  const whatsappNumber = "917002808115";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Pranab Milan Gogoi, I would like to offer relief materials / support for the Assam flood drive.")}`;
  const phoneUrl = "tel:7002808115";

  return (
    <div className="floating-widgets-stack">

      {/* Floating Call Button */}
      <a 
        href={phoneUrl} 
        className="floating-btn call-btn" 
        title="Call Organiser (7002808115)"
        aria-label="Call Organiser"
      >
        <FaPhone size={18} />
        <span className="tooltip-text">Call ☎ 7002808115</span>
      </a>

      {/* Floating WhatsApp Button */}
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-btn whatsapp-btn" 
        title="WhatsApp Organiser"
        aria-label="WhatsApp Organiser"
      >
        <FaWhatsapp size={22} />
        <span className="tooltip-text">WhatsApp Organiser</span>
      </a>
    </div>
  )
}
