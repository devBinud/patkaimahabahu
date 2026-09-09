import { useState, useMemo, useEffect } from 'react';
import {
  FaEnvelope,
  FaMagnifyingGlass,
  FaCheck,
  FaTrash,
  FaReply,
  FaXmark,
  FaUser,
  FaPhone,
  FaCalendarDays,
  FaPaperPlane,
  FaRotate,
  FaFileArrowDown,
  FaCopy
} from 'react-icons/fa6';
import './AdminPages.css';

const SUPABASE_URL = 'https://ckzyqhbzymoxzuwemwrw.supabase.co';
const SUPABASE_KEY = 'sb_publishable_O5vOV7LGac3nZ3dr_QTdqw_6EKmOSRb';
const SUBSCRIBERS_TABLE = 'pmf_subscribers';

const INITIAL_INQUIRIES = [
  {
    id: 1,
    name: 'Anurag Sharma',
    email: 'anurag@gmail.com',
    phone: '+91 98640 12345',
    subject: 'Volunteering in Flood Relief',
    message: 'Hello team Patkai Mahabahu, I am a youth volunteer from Dibrugarh willing to join your ground disaster relief operations. How can I enroll?',
    date: '08 Sep 2026',
    status: 'Pending',
    adminNotes: ''
  },
  {
    id: 2,
    name: 'Dipika Moran',
    email: 'dipika.m@outlook.com',
    phone: '+91 94350 56789',
    subject: 'Free Medical Camp Inquiry',
    message: 'We request your foundation to conduct an eye and health checkup camp in our tea garden village area in Tinsukia.',
    date: '07 Sep 2026',
    status: 'Reviewed',
    adminNotes: 'Coordination team contacted local community head.'
  },
  {
    id: 3,
    name: 'Pranab Saikia',
    email: 'psaikia@yahoo.com',
    phone: '+91 88760 99881',
    subject: 'Donation Receipt Verification',
    message: 'I made an online bank transfer on 5th September. Please confirm if 80G tax exemption receipt is issued.',
    date: '05 Sep 2026',
    status: 'Resolved',
    adminNotes: 'Verified with accounts team, receipt dispatched.'
  },
  {
    id: 4,
    name: 'Maitreyi Borah',
    email: 'mborah.edu@gmail.com',
    phone: '+91 91012 34567',
    subject: 'School Education Kits Sponsorship',
    message: 'We are a group of educators wanting to sponsor learning stationery for 50 children under PMF Education Mission.',
    date: '03 Sep 2026',
    status: 'Pending',
    adminNotes: ''
  }
];

export default function InquiriesManager({ initialTab }) {
  const [activeSection, setActiveSection] = useState(initialTab || 'inquiries'); // 'inquiries' | 'subscribers'
  const [inquiries, setInquiries] = useState(() => {
    try {
      const stored = localStorage.getItem('pmf_inquiries');
      return stored ? JSON.parse(stored) : INITIAL_INQUIRIES;
    } catch {
      return INITIAL_INQUIRIES;
    }
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [isInquiriesLoading, setIsInquiriesLoading] = useState(false);

  // Newsletter Subscribers State
  const [subscribers, setSubscribers] = useState(() => {
    try {
      const stored = localStorage.getItem('pmf_subscribers');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [subscribersSearch, setSubscribersSearch] = useState('');
  const [isSubscribersLoading, setIsSubscribersLoading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState('');

  useEffect(() => {
    if (initialTab) {
      setActiveSection(initialTab);
    }
  }, [initialTab]);

  const fetchInquiries = async () => {
    setIsInquiriesLoading(true);
    let allInqs = [];
    try {
      const stored = localStorage.getItem('pmf_inquiries');
      allInqs = stored ? JSON.parse(stored) : INITIAL_INQUIRIES;
    } catch {
      allInqs = INITIAL_INQUIRIES;
    }

    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/pmf_inquiries?select=*&order=created_at.desc`,
        {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`
          }
        }
      );
      if (res.ok) {
        const cloudData = await res.json();
        if (Array.isArray(cloudData) && cloudData.length > 0) {
          const map = new Map();
          cloudData.forEach((item) => {
            const key = item.id || `${item.email}_${item.message}`;
            map.set(key, {
              ...item,
              date: item.created_at
                ? new Date(item.created_at).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })
                : 'Recent'
            });
          });
          allInqs.forEach((item) => {
            const key = item.id || `${item.email}_${item.message}`;
            if (!map.has(key)) {
              map.set(key, item);
            }
          });
          allInqs = Array.from(map.values());
          localStorage.setItem('pmf_inquiries', JSON.stringify(allInqs));
        }
      }
    } catch (err) {
      console.warn('Supabase fetch inquiries:', err);
    }

    setInquiries(allInqs);
    setIsInquiriesLoading(false);
  };

  const fetchSubscribers = async () => {
    setIsSubscribersLoading(true);
    let allSubs = [];

    // 1. Read local backup
    try {
      const stored = localStorage.getItem('pmf_subscribers');
      if (stored) {
        allSubs = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Local read:', e);
    }

    // 2. Fetch from Supabase
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/${SUBSCRIBERS_TABLE}?select=*&order=subscribed_at.desc`,
        {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`
          }
        }
      );

      if (res.ok) {
        const cloudData = await res.json();
        if (Array.isArray(cloudData) && cloudData.length > 0) {
          const map = new Map();
          cloudData.forEach((item) => map.set(item.email, item));
          allSubs.forEach((item) => {
            if (!map.has(item.email)) {
              map.set(item.email, item);
            }
          });
          allSubs = Array.from(map.values());
          localStorage.setItem('pmf_subscribers', JSON.stringify(allSubs));
        }
      }
    } catch (e) {
      console.warn('Supabase fetch:', e);
    }

    setSubscribers(allSubs);
    setIsSubscribersLoading(false);
  };

  useEffect(() => {
    fetchInquiries();
    fetchSubscribers();
  }, []);

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(''), 2000);
  };

  const handleExportSubscribersCSV = () => {
    if (subscribers.length === 0) {
      alert('No subscribers to export.');
      return;
    }
    const header = ['ID', 'Email', 'Subscribed At', 'Source'];
    const rows = filteredSubscribers.map((s, idx) => [
      s.id || idx + 1,
      `"${s.email}"`,
      `"${s.subscribed_at ? new Date(s.subscribed_at).toLocaleString() : ''}"`,
      `"${s.source || 'website_footer_banner'}"`
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [header.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encoded = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encoded);
    link.setAttribute(
      'download',
      `pmf_newsletter_subscribers_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredSubscribers = useMemo(() => {
    const q = subscribersSearch.toLowerCase().trim();
    if (!q) return subscribers;
    return subscribers.filter((s) => s.email?.toLowerCase().includes(q));
  }, [subscribers, subscribersSearch]);

  const saveInquiries = (updated) => {
    setInquiries(updated);
    localStorage.setItem('pmf_inquiries', JSON.stringify(updated));
  };

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesFilter =
        statusFilter === 'all' || inq.status.toLowerCase() === statusFilter.toLowerCase();

      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        inq.name.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        inq.subject.toLowerCase().includes(q) ||
        inq.message.toLowerCase().includes(q);

      return matchesFilter && matchesSearch;
    });
  }, [inquiries, statusFilter, searchTerm]);

  const handleUpdateStatus = (id, newStatus) => {
    const updated = inquiries.map((inq) =>
      inq.id === id ? { ...inq, status: newStatus } : inq
    );
    saveInquiries(updated);
    if (selectedInquiry?.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry record?')) {
      const updated = inquiries.filter((inq) => inq.id !== id);
      saveInquiries(updated);
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
    }
  };

  const handleSaveNotes = (e) => {
    e.preventDefault();
    if (!selectedInquiry) return;

    const updated = inquiries.map((inq) =>
      inq.id === selectedInquiry.id
        ? { ...inq, adminNotes: replyText, status: 'Reviewed' }
        : inq
    );
    saveInquiries(updated);
    setSelectedInquiry({ ...selectedInquiry, adminNotes: replyText, status: 'Reviewed' });
    alert('Administrative note saved.');
  };

  return (
    <div className="admin-page-container">
      {/* Page Header */}
      <div className="admin-page-header">
        <div className="admin-page-header-text">
          <h1>{activeSection === 'inquiries' ? 'Citizen Inquiries & Messages' : 'Newsletter Subscribers'}</h1>
          <p>
            {activeSection === 'inquiries'
              ? 'Review and resolve communication from volunteers, donors, and community members.'
              : 'Real-time list of citizen email subscribers captured from the website newsletter banner.'}
          </p>
        </div>

        {activeSection === 'inquiries' && (
          <div className="admin-header-actions">
            <button
              onClick={fetchInquiries}
              className="admin-btn admin-btn-secondary"
              disabled={isInquiriesLoading}
              title="Sync inquiries from Supabase"
            >
              <FaRotate className={isInquiriesLoading ? 'spin-icon' : ''} />
              <span>{isInquiriesLoading ? 'Syncing...' : 'Refresh'}</span>
            </button>
          </div>
        )}

        {activeSection === 'subscribers' && (
          <div className="admin-header-actions">
            <button
              onClick={fetchSubscribers}
              className="admin-btn admin-btn-secondary"
              disabled={isSubscribersLoading}
              title="Sync subscribers from Supabase"
            >
              <FaRotate className={isSubscribersLoading ? 'spin-icon' : ''} />
              <span>{isSubscribersLoading ? 'Syncing...' : 'Refresh'}</span>
            </button>
            <button
              onClick={handleExportSubscribersCSV}
              className="admin-btn admin-btn-secondary"
              title="Export subscriber emails to CSV"
              disabled={subscribers.length === 0}
            >
              <FaFileArrowDown />
              <span>Export CSV</span>
            </button>
          </div>
        )}
      </div>

      {/* Top Section Tabs */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveSection('inquiries')}
          className={`admin-btn ${activeSection === 'inquiries' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
        >
          <FaEnvelope /> Citizen Inquiries ({inquiries.length})
        </button>
        <button
          onClick={() => {
            setActiveSection('subscribers');
            fetchSubscribers();
          }}
          className={`admin-btn ${activeSection === 'subscribers' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
        >
          <FaPaperPlane /> Newsletter Subscribers ({subscribers.length})
        </button>
      </div>

      {activeSection === 'subscribers' ? (
        /* Newsletter Subscribers View */
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-toolbar" style={{ width: '100%', margin: 0 }}>
              <div className="admin-search-box" style={{ maxWidth: '380px' }}>
                <FaMagnifyingGlass className="admin-search-icon" />
                <input
                  type="text"
                  placeholder="Search subscriber by email..."
                  value={subscribersSearch}
                  onChange={(e) => setSubscribersSearch(e.target.value)}
                  className="admin-search-input"
                />
              </div>
              <div style={{ color: '#94a3b8', fontSize: '13px' }}>
                Showing <strong>{filteredSubscribers.length}</strong> of {subscribers.length} subscribers
              </div>
            </div>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>#</th>
                  <th>Subscriber Email</th>
                  <th>Subscribed Date &amp; Time</th>
                  <th>Source Channel</th>
                  <th style={{ width: '140px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscribers.length === 0 ? (
                  <tr>
                    <td colSpan="5">
                      <div className="admin-empty-state">
                        <FaPaperPlane className="admin-empty-icon" />
                        <p>No newsletter subscribers found.</p>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>
                          When visitors enter their email in the website footer banner, they will appear here in real-time.
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredSubscribers.map((sub, idx) => (
                    <tr key={sub.id || sub.email}>
                      <td style={{ color: '#64748b' }}>{idx + 1}</td>
                      <td>
                        <div style={{ fontWeight: 600, color: '#f8fafc', fontSize: '14px' }}>
                          {sub.email}
                        </div>
                      </td>
                      <td style={{ color: '#94a3b8', fontSize: '12.5px' }}>
                        {sub.subscribed_at
                          ? new Date(sub.subscribed_at).toLocaleString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : 'Recent'}
                      </td>
                      <td>
                        <span className="admin-badge admin-badge-emerald">
                          {sub.source || 'website_footer_banner'}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleCopyEmail(sub.email)}
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                          title="Copy Email"
                        >
                          <FaCopy /> {copiedEmail === sub.email ? 'Copied!' : 'Copy'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Main Inquiries Table Card */
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-toolbar" style={{ width: '100%', margin: 0 }}>
              <div className="admin-search-box">
                <FaMagnifyingGlass className="admin-search-icon" />
                <input
                  type="text"
                  placeholder="Search inquiries by name, email, or message..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="admin-search-input"
                />
              </div>

            <div className="admin-filter-tabs">
              <button
                className={`admin-tab-btn ${statusFilter === 'all' ? 'active' : ''}`}
                onClick={() => setStatusFilter('all')}
              >
                All ({inquiries.length})
              </button>
              <button
                className={`admin-tab-btn ${statusFilter === 'pending' ? 'active' : ''}`}
                onClick={() => setStatusFilter('pending')}
              >
                Pending ({inquiries.filter((i) => i.status === 'Pending').length})
              </button>
              <button
                className={`admin-tab-btn ${statusFilter === 'reviewed' ? 'active' : ''}`}
                onClick={() => setStatusFilter('reviewed')}
              >
                Reviewed
              </button>
              <button
                className={`admin-tab-btn ${statusFilter === 'resolved' ? 'active' : ''}`}
                onClick={() => setStatusFilter('resolved')}
              >
                Resolved
              </button>
            </div>
          </div>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Citizen Details</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan="5">
                    <div className="admin-empty-state">
                      <FaEnvelope className="admin-empty-icon" />
                      <p>No inquiries found matching your current filter.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr key={inq.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: '#f8fafc' }}>{inq.name}</div>
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>{inq.email}</div>
                      {inq.phone && (
                        <div style={{ fontSize: '11px', color: '#64748b' }}>{inq.phone}</div>
                      )}
                    </td>
                    <td>
                      <div style={{ fontWeight: 500, color: '#e2e8f0' }}>{inq.subject}</div>
                      <div
                        style={{
                          fontSize: '12px',
                          color: '#94a3b8',
                          maxWidth: '320px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {inq.message}
                      </div>
                    </td>
                    <td style={{ color: '#94a3b8', fontSize: '12px' }}>{inq.date}</td>
                    <td>
                      <span
                        className={`admin-badge ${
                          inq.status === 'Resolved'
                            ? 'admin-badge-emerald'
                            : inq.status === 'Reviewed'
                            ? 'admin-badge-blue'
                            : 'admin-badge-amber'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => {
                            setSelectedInquiry(inq);
                            setReplyText(inq.adminNotes || '');
                          }}
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                          title="View Details"
                        >
                          <FaReply /> View
                        </button>
                        <button
                          onClick={() => handleDelete(inq.id)}
                          className="admin-btn admin-btn-danger admin-btn-sm"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    )}

      {/* Inquiry Detail & Reply Modal */}
      {selectedInquiry && (
        <div className="admin-modal-overlay" onClick={() => setSelectedInquiry(null)}>
          <div className="admin-modal" style={{ maxWidth: '600px' }} onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Inquiry Information</h3>
              <button className="admin-modal-close" onClick={() => setSelectedInquiry(null)}>
                <FaXmark />
              </button>
            </div>

            <div className="admin-modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="admin-field">
                  <label>Sender</label>
                  <div style={{ color: '#f8fafc', fontWeight: 600 }}>{selectedInquiry.name}</div>
                </div>
                <div className="admin-field">
                  <label>Email Address</label>
                  <div style={{ color: '#60a5fa' }}>{selectedInquiry.email}</div>
                </div>
                <div className="admin-field">
                  <label>Phone Number</label>
                  <div style={{ color: '#cbd5e1' }}>{selectedInquiry.phone || 'N/A'}</div>
                </div>
                <div className="admin-field">
                  <label>Received Date</label>
                  <div style={{ color: '#cbd5e1' }}>{selectedInquiry.date}</div>
                </div>
              </div>

              <div className="admin-field">
                <label>Subject</label>
                <div style={{ fontWeight: 600, color: '#f8fafc', background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '6px' }}>
                  {selectedInquiry.subject}
                </div>
              </div>

              <div className="admin-field">
                <label>Message Content</label>
                <div style={{ background: 'rgba(2, 6, 23, 0.7)', padding: '12px', borderRadius: '8px', color: '#e2e8f0', lineHeight: '1.5', fontSize: '13.5px' }}>
                  {selectedInquiry.message}
                </div>
              </div>

              <div className="admin-field">
                <label>Status Management</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['Pending', 'Reviewed', 'Resolved'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleUpdateStatus(selectedInquiry.id, st)}
                      className={`admin-btn admin-btn-sm ${
                        selectedInquiry.status === st ? 'admin-btn-primary' : 'admin-btn-secondary'
                      }`}
                    >
                      {selectedInquiry.status === st && <FaCheck />} {st}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSaveNotes} className="admin-field">
                <label>Internal Administrator Notes</label>
                <textarea
                  placeholder="Add administrative review notes or action taken..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <button
                  type="submit"
                  className="admin-btn admin-btn-secondary admin-btn-sm"
                  style={{ alignSelf: 'flex-start', marginTop: '6px' }}
                >
                  Save Internal Note
                </button>
              </form>
            </div>

            <div className="admin-modal-footer">
              <button
                type="button"
                className="admin-btn admin-btn-secondary"
                onClick={() => setSelectedInquiry(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
