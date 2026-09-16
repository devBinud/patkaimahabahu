import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAdminAuth } from './AdminAuthContext';
import {
  FaChartPie,
  FaChartLine,
  FaHandHoldingHeart,
  FaEnvelope,
  FaGear,
  FaArrowRightFromBracket,
  FaBars,
  FaXmark,
  FaGlobe,
  FaUserShield,
  FaClock,
  FaCircleCheck,
  FaListCheck,
  FaPaperPlane
} from 'react-icons/fa6';
import logoImg from '../assets/logo.png';
import './AdminLayout.css';

export default function AdminLayout() {
  const { adminUser, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('en-IN', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    {
      to: '/admin',
      end: true,
      label: 'Dashboard Overview',
      icon: <FaChartPie />
    },
    {
      to: '/admin/analytics',
      label: 'Visitor Analytics',
      icon: <FaChartLine />
    },
    {
      to: '/admin/contributions',
      label: 'Contributions & Donors',
      icon: <FaHandHoldingHeart />
    },
    {
      to: '/admin/inquiries',
      label: 'Citizen Inquiries',
      icon: <FaEnvelope />
    },
    {
      to: '/admin/subscribers',
      label: 'Newsletter Subscribers',
      icon: <FaPaperPlane />
    },
    {
      to: '/admin/programs',
      label: 'Foundation Programs',
      icon: <FaListCheck />
    },
    {
      to: '/admin/settings',
      label: 'Admin Settings',
      icon: <FaGear />
    }
  ];

  return (
    <div className="admin-root">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="admin-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <Link to="/admin" className="admin-brand">
            <img src={logoImg} alt="PMF Logo" className="admin-brand-logo" />
            <div className="admin-brand-text">
              <span className="brand-name">PMF Admin</span>
              <span className="brand-sub">Management Portal</span>
            </div>
          </Link>
          <button
            className="sidebar-close-btn"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <FaXmark />
          </button>
        </div>

        <div className="admin-sidebar-nav-container">
          <div className="nav-section-label">MAIN NAVIGATION</div>
          <nav className="admin-sidebar-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `admin-nav-item ${isActive ? 'active' : ''}`
                }
              >
                <span className="nav-item-icon">{item.icon}</span>
                <span className="nav-item-label">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="nav-section-label" style={{ marginTop: '24px' }}>
            QUICK ACCESS
          </div>
          <nav className="admin-sidebar-nav">
            <Link to="/" className="admin-nav-item external-link" target="_blank">
              <span className="nav-item-icon"><FaGlobe /></span>
              <span className="nav-item-label">View Live Website</span>
            </Link>
          </nav>
        </div>

        <div className="admin-sidebar-footer">
          <div className="admin-user-card">
            <div className="admin-user-avatar">
              <FaUserShield />
            </div>
            <div className="admin-user-info">
              <span className="user-display-name">{adminUser?.name || 'Administrator'}</span>
              <span className="user-role-badge">
                <span className="online-dot" />
                {adminUser?.role || 'Super Admin'}
              </span>
            </div>
          </div>
          <button onClick={handleLogout} className="sidebar-logout-btn" title="Log Out">
            <FaArrowRightFromBracket />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main-wrapper">
        {/* Topbar */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <button
              className="mobile-menu-trigger"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar menu"
            >
              <FaBars />
            </button>
          </div>

          <div className="topbar-right">
            <div className="topbar-time-chip">
              <FaClock className="time-icon" />
              <span>{currentTime}</span>
            </div>
          </div>
        </header>

        {/* Dynamic Nested Route Content */}
        <div className="admin-content-outlet">
          <Outlet />

          {/* Admin Bottom Footer Credit */}
          <footer className="admin-footer">
            <p className="admin-footer-copy">
              © {new Date().getFullYear()} Patkai Mahabahu Foundation
            </p>
            <p className="admin-footer-credit">
              Designed &amp; Developed by{' '}
              <a
                href="https://www.binudsoftwaresolutions.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="admin-dev-link"
              >
                Binud Software Solutions
              </a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
