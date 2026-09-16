import { useState, useMemo, useEffect } from 'react';
import {
  FaHandHoldingHeart,
  FaMagnifyingGlass,
  FaPlus,
  FaFileArrowDown,
  FaAngleLeft,
  FaAngleRight,
  FaTrash,
  FaCheck,
  FaXmark,
  FaCoins
} from 'react-icons/fa6';
import cashContributorsData from '../../data/cashContributors.json';
import augustContributionsData from '../../data/augustContributions.json';
import './AdminPages.css';

export default function ContributionsManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'cash', 'august'
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 25;

  // Custom contributors stored in localStorage
  const [customContributors, setCustomContributors] = useState(() => {
    try {
      const saved = localStorage.getItem('pmf_custom_contributors');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDonorName, setNewDonorName] = useState('');
  const [newDonorAmount, setNewDonorAmount] = useState('');
  const [newDonorType, setNewDonorType] = useState('General Cash');
  const [newDonorParticulars, setNewDonorParticulars] = useState('');

  // Combined dataset
  const allContributors = useMemo(() => {
    const list = [];

    // Custom
    customContributors.forEach((c) => {
      list.push({
        id: c.id,
        name: c.name,
        amount: Number(c.amount) || 0,
        register: c.type || 'General Cash',
        particulars: c.particulars || 'Direct Offline / Online Donation',
        isCustom: true
      });
    });

    // Cash contributors
    if (activeFilter === 'all' || activeFilter === 'cash') {
      cashContributorsData.forEach((c, idx) => {
        list.push({
          id: `cash-${idx}`,
          name: c.name,
          amount: Number(c.amount) || 0,
          register: 'General Cash Register',
          particulars: c.particulars || 'Foundation General Fund',
          isCustom: false
        });
      });
    }

    // August register
    if (activeFilter === 'all' || activeFilter === 'august') {
      augustContributionsData.forEach((c, idx) => {
        list.push({
          id: `aug-${idx}`,
          name: c.name,
          amount: Number(c.amount) || 0,
          register: 'August 2026 Register',
          particulars: c.particulars || 'Monthly Flood / Relief Drive',
          isCustom: false
        });
      });
    }

    return list;
  }, [customContributors, activeFilter]);

  // Filtered by search
  const filteredList = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return allContributors;

    return allContributors.filter((item) => {
      const matchName = item.name && item.name.toLowerCase().includes(q);
      const matchAmount = item.amount && item.amount.toString().includes(q);
      const matchParticulars = item.particulars && item.particulars.toLowerCase().includes(q);
      return matchName || matchAmount || matchParticulars;
    });
  }, [allContributors, searchTerm]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredList.length / rowsPerPage));
  const startIdx = (currentPage - 1) * rowsPerPage;
  const pageItems = filteredList.slice(startIdx, startIdx + rowsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFilter]);

  const handleAddContributor = (e) => {
    e.preventDefault();
    if (!newDonorName.trim() || !newDonorAmount) return;

    const newEntry = {
      id: `custom-${Date.now()}`,
      name: newDonorName.trim(),
      amount: Number(newDonorAmount),
      type: newDonorType,
      particulars: newDonorParticulars.trim() || 'Official Administrative Entry',
      date: new Date().toLocaleDateString('en-IN')
    };

    const updated = [newEntry, ...customContributors];
    setCustomContributors(updated);
    localStorage.setItem('pmf_custom_contributors', JSON.stringify(updated));

    // Reset form
    setNewDonorName('');
    setNewDonorAmount('');
    setNewDonorParticulars('');
    setIsModalOpen(false);
  };

  const handleDeleteCustom = (id) => {
    if (window.confirm('Delete this contributor entry?')) {
      const updated = customContributors.filter((c) => c.id !== id);
      setCustomContributors(updated);
      localStorage.setItem('pmf_custom_contributors', JSON.stringify(updated));
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Donor Name', 'Amount (INR)', 'Register / Category', 'Particulars'];
    const rows = filteredList.map((item, index) => [
      index + 1,
      `"${(item.name || '').replace(/"/g, '""')}"`,
      item.amount,
      `"${item.register}"`,
      `"${(item.particulars || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PMF_Contributions_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalFilteredSum = useMemo(() => {
    return filteredList.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);
  }, [filteredList]);

  return (
    <div className="admin-page-container">
      {/* Page Header */}
      <div className="admin-page-header">
        <div className="admin-page-header-text">
          <h1>Contributions & Donors Register</h1>
          <p>Inspect, audit, and log verified citizen donations and relief contributions.</p>
        </div>
        <div className="admin-header-actions">
          <button onClick={handleExportCSV} className="admin-btn admin-btn-secondary" title="Export to CSV">
            <FaFileArrowDown />
            <span>Export CSV</span>
          </button>
          <button onClick={() => setIsModalOpen(true)} className="admin-btn admin-btn-primary">
            <FaPlus />
            <span>Add Contributor</span>
          </button>
        </div>
      </div>

      {/* Summary Highlight */}
      <div className="admin-stat-card" style={{ background: 'linear-gradient(90deg, #0d1522 0%, #0d2818 100%)' }}>
        <div className="admin-stat-icon-wrapper emerald">
          <FaCoins />
        </div>
        <div className="admin-stat-content">
          <span className="admin-stat-label">Total Amount in Current View</span>
          <span className="admin-stat-value">₹{totalFilteredSum.toLocaleString('en-IN')}</span>
          <span className="admin-stat-badge">
            <FaCheck /> {filteredList.length} total entries matching criteria
          </span>
        </div>
      </div>

      {/* Table Card */}
      <div className="admin-card">
        <div className="admin-card-header">
          {/* Toolbar */}
          <div className="admin-toolbar" style={{ width: '100%', margin: 0 }}>
            <div className="admin-search-box">
              <FaMagnifyingGlass className="admin-search-icon" />
              <input
                type="text"
                placeholder="Search by donor name, particulars, or amount..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-search-input"
              />
            </div>

            <div className="admin-filter-tabs">
              <button
                className={`admin-tab-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All Registers
              </button>
              <button
                className={`admin-tab-btn ${activeFilter === 'cash' ? 'active' : ''}`}
                onClick={() => setActiveFilter('cash')}
              >
                General Cash
              </button>
              <button
                className={`admin-tab-btn ${activeFilter === 'august' ? 'active' : ''}`}
                onClick={() => setActiveFilter('august')}
              >
                August 2026 Drive
              </button>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Donor Name</th>
                <th>Amount (₹)</th>
                <th>Register / Category</th>
                <th>Particulars / Notes</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    <div className="admin-empty-state">
                      <FaHandHoldingHeart className="admin-empty-icon" />
                      <p>No contributors found matching your search term.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                pageItems.map((item, index) => (
                  <tr key={item.id}>
                    <td style={{ color: '#64748b' }}>{startIdx + index + 1}</td>
                    <td style={{ fontWeight: 600, color: '#f8fafc' }}>
                      {item.name}
                      {item.isCustom && (
                        <span className="admin-badge admin-badge-purple" style={{ marginLeft: '6px' }}>
                          New Entry
                        </span>
                      )}
                    </td>
                    <td style={{ color: '#34d399', fontWeight: 600, fontSize: '14px' }}>
                      ₹{item.amount.toLocaleString('en-IN')}
                    </td>
                    <td>
                      <span className={`admin-badge ${
                        item.register.includes('August') ? 'admin-badge-blue' : 'admin-badge-emerald'
                      }`}>
                        {item.register}
                      </span>
                    </td>
                    <td style={{ color: '#94a3b8', fontSize: '13px' }}>
                      {item.particulars}
                    </td>
                    <td>
                      {item.isCustom ? (
                        <button
                          onClick={() => handleDeleteCustom(item.id)}
                          className="admin-btn admin-btn-danger admin-btn-sm"
                          title="Delete entry"
                        >
                          <FaTrash />
                        </button>
                      ) : (
                        <span style={{ fontSize: '11px', color: '#64748b' }}>System File</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="admin-pagination">
          <span>
            Showing <strong>{pageItems.length > 0 ? startIdx + 1 : 0}</strong> -{' '}
            <strong>{Math.min(startIdx + rowsPerPage, filteredList.length)}</strong> of{' '}
            <strong>{filteredList.length}</strong> contributors
          </span>

          <div className="pagination-controls">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              <FaAngleLeft /> Previous
            </button>
            <span style={{ padding: '0 8px', color: '#f8fafc', fontWeight: 600 }}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next <FaAngleRight />
            </button>
          </div>
        </div>
      </div>

      {/* Add Contributor Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Log New Contributor</h3>
              <button className="admin-modal-close" onClick={() => setIsModalOpen(false)}>
                <FaXmark />
              </button>
            </div>

            <form onSubmit={handleAddContributor}>
              <div className="admin-modal-body">
                <div className="admin-field">
                  <label>Donor / Contributor Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sri Ramesh Gogoi"
                    value={newDonorName}
                    onChange={(e) => setNewDonorName(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="admin-field">
                  <label>Contribution Amount (₹ INR) *</label>
                  <input
                    type="number"
                    min="1"
                    required
                    placeholder="e.g. 5000"
                    value={newDonorAmount}
                    onChange={(e) => setNewDonorAmount(e.target.value)}
                  />
                </div>

                <div className="admin-field">
                  <label>Register / Program *</label>
                  <select
                    value={newDonorType}
                    onChange={(e) => setNewDonorType(e.target.value)}
                  >
                    <option value="General Cash">General Cash Register</option>
                    <option value="August 2026 Drive">August 2026 Relief Drive</option>
                    <option value="Medical Camp Aid">Medical Camp & Healthcare Aid</option>
                    <option value="Education Sponsorship">Education & Student Sponsorship</option>
                  </select>
                </div>

                <div className="admin-field">
                  <label>Particulars / Notes</label>
                  <textarea
                    placeholder="e.g. Cash handed over at district headquarters with receipt #4092"
                    value={newDonorParticulars}
                    onChange={(e) => setNewDonorParticulars(e.target.value)}
                  />
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  <FaCheck />
                  <span>Save Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
