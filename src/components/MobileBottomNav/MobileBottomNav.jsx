import { NavLink } from 'react-router-dom'
import { Home, HeartHandshake, PhoneCall } from 'lucide-react'
import './MobileBottomNav.css'

export default function MobileBottomNav() {
  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      <div className="mobile-nav-inner">
        {/* 1. Home */}
        <NavLink
          to="/"
          end
          className={({ isActive }) => `mobile-nav-tab ${isActive ? 'active' : ''}`}
        >
          <div className="mobile-tab-icon-wrap">
            <Home size={19} className="mobile-tab-icon" />
          </div>
          <span className="mobile-tab-label">Home</span>
        </NavLink>

        {/* 2. What We Do */}
        <NavLink
          to="/specialties"
          className={({ isActive }) => `mobile-nav-tab ${isActive ? 'active' : ''}`}
        >
          <div className="mobile-tab-icon-wrap">
            <HeartHandshake size={19} className="mobile-tab-icon" />
          </div>
          <span className="mobile-tab-label">What We Do</span>
        </NavLink>

        {/* 3. Contact */}
        <NavLink
          to="/contact"
          className={({ isActive }) => `mobile-nav-tab ${isActive ? 'active' : ''}`}
        >
          <div className="mobile-tab-icon-wrap">
            <PhoneCall size={19} className="mobile-tab-icon" />
          </div>
          <span className="mobile-tab-label">Contact</span>
        </NavLink>
      </div>
    </nav>
  )
}
