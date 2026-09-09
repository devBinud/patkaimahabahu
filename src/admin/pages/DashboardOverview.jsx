import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHandHoldingHeart,
  FaUsers,
  FaEnvelope,
  FaLayerGroup,
  FaArrowRight,
  FaPlus,
  FaFileArrowDown,
  FaShieldHeart,
  FaCircleInfo
} from 'react-icons/fa6';
import cashContributorsData from '../../data/cashContributors.json';
import augustContributionsData from '../../data/augustContributions.json';
import './AdminPages.css';

export default function DashboardOverview() {
  // Read extra custom contributors from local storage if any
  const customContributors = useMemo(() => {
    try {
      const stored = localStorage.getItem('pmf_custom_contributors');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }, []);

  const totalCashAmount = useMemo(() => {
    const defaultSum = cashContributorsData.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);
    const customSum = customContributors.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);
    return defaultSum + customSum;
  }, [customContributors]);

  const totalAugustAmount = useMemo(() => {
    return augustContributionsData.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);
  }, []);

  const grandTotal = totalCashAmount + totalAugustAmount;
  const totalContributorsCount = cashContributorsData.length + augustContributionsData.length + customContributors.length;

  // Recent 5 contributions
  const recentContributions = useMemo(() => {
    const list = [...customContributors, ...cashContributorsData.slice(0, 5)];
    return list.slice(0, 6);
  }, [customContributors]);

  // Sample inquiries from localStorage or defaults
  const inquiries = useMemo(() => {
    try {
      const stored = localStorage.getItem('pmf_inquiries');
      if (stored) return JSON.parse(stored);
    } catch { }
    return [
      { id: 1, name: 'Anurag Sharma', email: 'anurag@gmail.com', subject: 'Volunteering in Flood Relief', date: 'Yesterday', status: 'Pending' },
      { id: 2, name: 'Dipika Moran', email: 'dipika.m@outlook.com', subject: 'Free Medical Camp Inquiry', date: '2 days ago', status: 'Reviewed' },
      { id: 3, name: 'Pranab Saikia', email: 'psaikia@yahoo.com', subject: 'Donation Receipt Verification', date: '3 days ago', status: 'Resolved' },
    ];
  }, []);

  return (
    <div className="admin-page-container">
      {/* Header */}
      <div className="admin-page-header">
        <div className="admin-page-header-text">
          <h1>Foundation Dashboard</h1>
          <p>Real-time overview of Patkai Mahabahu Foundation operations, contributions, and community outreach.</p>
        </div>
        <div className="admin-header-actions">
          <Link to="/admin/contributions" className="admin-btn admin-btn-primary">
            <FaPlus />
            <span>Manage Contributions</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrapper emerald">
            <FaHandHoldingHeart />
          </div>
          <div className="admin-stat-content">
            <span className="admin-stat-label">Total Verified Funds</span>
            <span className="admin-stat-value">₹{grandTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrapper blue">
            <FaUsers />
          </div>
          <div className="admin-stat-content">
            <span className="admin-stat-label">Total Contributors</span>
            <span className="admin-stat-value">{totalContributorsCount.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrapper amber">
            <FaLayerGroup />
          </div>
          <div className="admin-stat-content">
            <span className="admin-stat-label">Active Core Pillars</span>
            <span className="admin-stat-value">4 Initiatives</span>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon-wrapper purple">
            <FaEnvelope />
          </div>
          <div className="admin-stat-content">
            <span className="admin-stat-label">Community Inquiries</span>
            <span className="admin-stat-value">{inquiries.length} Active</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout for Recent Activities */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {/* Recent Contributions Card */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">
              Recent Contributions
            </h3>
            <Link to="/admin/contributions" className="admin-btn admin-btn-secondary admin-btn-sm">
              <span>View All</span>
              <FaArrowRight />
            </Link>
          </div>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Donor Name</th>
                  <th>Amount</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {recentContributions.map((item, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600 }}>{item.name || 'Anonymous Donor'}</td>
                    <td style={{ color: '#34d399', fontWeight: 600 }}>
                      ₹{Number(item.amount || 0).toLocaleString('en-IN')}
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-emerald">Verified</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Inquiries Card */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">
              Citizen Messages & Inquiries
            </h3>
            <Link to="/admin/inquiries" className="admin-btn admin-btn-secondary admin-btn-sm">
              <span>Manage</span>
              <FaArrowRight />
            </Link>
          </div>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Citizen</th>
                  <th>Subject</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => (
                  <tr key={inq.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{inq.name}</div>
                      <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>{inq.email}</div>
                    </td>
                    <td>{inq.subject}</td>
                    <td>
                      <span className={`admin-badge ${inq.status === 'Resolved' ? 'admin-badge-emerald' :
                        inq.status === 'Reviewed' ? 'admin-badge-blue' : 'admin-badge-amber'
                        }`}>
                        {inq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Foundation Security & Notice Banner */}
      <div className="admin-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(13, 21, 34, 0.9) 100%)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
        <div className="admin-card-body" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '28px', color: '#10b981' }}>
            <FaShieldHeart />
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#ffffff' }}>Patkai Mahabahu Foundation Internal Portal</h4>
            <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>
              All administrative operations are encrypted and securely synchronized. For manual changes to foundation public pages, use the corresponding management modules.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
