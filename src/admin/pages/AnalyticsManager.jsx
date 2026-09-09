import { useState, useMemo, useEffect } from 'react';
import {
  FaChartLine,
  FaUsers,
  FaMobileScreenButton,
  FaLaptop,
  FaGlobe,
  FaMagnifyingGlass,
  FaFileArrowDown,
  FaTrash,
  FaRotate,
  FaCircle,
  FaCompass,
  FaLocationDot,
  FaClock
} from 'react-icons/fa6';
import { fetchLiveVisitorLogs, clearVisitorLogs } from '../analyticsTracker';
import './AdminPages.css';

export default function AnalyticsManager() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [deviceFilter, setDeviceFilter] = useState('all'); // 'all', 'Mobile', 'Desktop'
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  const refreshLogs = async (isManual = false) => {
    if (isManual) {
      setIsRefreshing(true);
    }
    try {
      const data = await fetchLiveVisitorLogs();
      setLogs(data);
    } catch (e) {
      console.error('Error fetching live visitor logs:', e);
    } finally {
      setIsLoading(false);
      if (isManual) {
        setTimeout(() => setIsRefreshing(false), 450);
      }
    }
  };

  useEffect(() => {
    refreshLogs(false);
    // Real-time automatic polling every 8 seconds
    const timer = setInterval(() => {
      refreshLogs(false);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Compute live stats
  const totalViews = logs.length;
  const uniqueVisitors = useMemo(() => {
    const set = new Set(logs.map((l) => l.visitorId || l.ip));
    return set.size;
  }, [logs]);

  const mobileCount = useMemo(() => {
    return logs.filter((l) => l.device === 'Mobile').length;
  }, [logs]);

  const mobilePercentage = totalViews > 0 ? Math.round((mobileCount / totalViews) * 100) : 0;

  const topPage = useMemo(() => {
    if (logs.length === 0) return 'None yet';
    const counts = {};
    logs.forEach((l) => {
      counts[l.page] = (counts[l.page] || 0) + 1;
    });
    let max = '/';
    let maxCount = 0;
    for (const [p, c] of Object.entries(counts)) {
      if (c > maxCount) {
        maxCount = c;
        max = p;
      }
    }
    return max;
  }, [logs]);

  // Filtered logs
  const filteredLogs = useMemo(() => {
    return logs.filter((item) => {
      const matchDevice =
        deviceFilter === 'all' || item.device.toLowerCase() === deviceFilter.toLowerCase();

      const q = searchTerm.toLowerCase().trim();
      const matchSearch =
        !q ||
        (item.ip && item.ip.toLowerCase().includes(q)) ||
        (item.city && item.city.toLowerCase().includes(q)) ||
        (item.page && item.page.toLowerCase().includes(q)) ||
        (item.browser && item.browser.toLowerCase().includes(q)) ||
        (item.referrer && item.referrer.toLowerCase().includes(q));

      return matchDevice && matchSearch;
    });
  }, [logs, deviceFilter, searchTerm]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / rowsPerPage));
  const startIdx = (currentPage - 1) * rowsPerPage;
  const pageItems = filteredLogs.slice(startIdx, startIdx + rowsPerPage);

  const handleClear = async () => {
    if (window.confirm('Are you sure you want to delete all visitor analytics records from cloud database?')) {
      setIsRefreshing(true);
      await clearVisitorLogs();
      setLogs([]);
      setIsRefreshing(false);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Visitor ID', 'IP Address', 'City', 'Region', 'Country', 'Page', 'Device', 'OS', 'Browser', 'Referrer', 'Date Time'];
    const rows = filteredLogs.map((l) => [
      `"${l.visitorId || ''}"`,
      `"${l.ip || ''}"`,
      `"${l.city || ''}"`,
      `"${l.region || ''}"`,
      `"${l.country || ''}"`,
      `"${l.page || ''}"`,
      `"${l.device || ''}"`,
      `"${l.os || ''}"`,
      `"${l.browser || ''}"`,
      `"${l.referrer || ''}"`,
      `"${new Date(l.timestamp).toLocaleString('en-IN')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `PMF_Visitor_Analytics_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatExactTime = (dateString) => {
    try {
      const d = new Date(dateString);
      return d.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
    } catch {
      return '--';
    }
  };

  const formatExactDate = (dateString) => {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return '--';
    }
  };

  const showSkeleton = isLoading || isRefreshing;

  return (
    <div className="admin-page-container">
      {/* Header */}
      <div className="admin-page-header">
        <div className="admin-page-header-text">
          <h1>Website Visitor Analytics</h1>
          <p>Real-time traffic telemetry and citizen engagement monitoring directly from your Supabase cloud database.</p>
        </div>
        <div className="admin-header-actions">
          <button
            onClick={() => refreshLogs(true)}
            className="admin-btn admin-btn-secondary"
            disabled={isRefreshing}
            title="Refresh live visitor telemetry"
          >
            <FaRotate className={isRefreshing ? 'spin-icon' : ''} />
            <span>{isRefreshing ? 'Syncing...' : 'Refresh'}</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="admin-btn admin-btn-secondary"
            title="Export CSV"
            disabled={logs.length === 0}
          >
            <FaFileArrowDown />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleClear}
            className="admin-btn admin-btn-danger"
            title="Clear visitor database"
            disabled={logs.length === 0}
          >
            <FaTrash />
            <span>Clear Logs</span>
          </button>
        </div>
      </div>

      {/* Stats Cards (With Shimmer Skeleton State) */}
      <div className="admin-stats-grid">
        {showSkeleton ? (
          <>
            {[1, 2, 3, 4].map((idx) => (
              <div key={idx} className="admin-stat-card">
                <div className="admin-skeleton skeleton-icon" />
                <div className="admin-stat-content" style={{ flex: 1 }}>
                  <div className="admin-skeleton skeleton-text-sm" />
                  <div className="admin-skeleton skeleton-text-lg" />
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="admin-stat-card">
              <div className="admin-stat-icon-wrapper emerald">
                <FaChartLine />
              </div>
              <div className="admin-stat-content">
                <span className="admin-stat-label">Total Real Visits</span>
                <span className="admin-stat-value">{totalViews.toLocaleString()}</span>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon-wrapper blue">
                <FaUsers />
              </div>
              <div className="admin-stat-content">
                <span className="admin-stat-label">Unique Citizens</span>
                <span className="admin-stat-value">{uniqueVisitors.toLocaleString()}</span>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon-wrapper amber">
                <FaMobileScreenButton />
              </div>
              <div className="admin-stat-content">
                <span className="admin-stat-label">Mobile Traffic Share</span>
                <span className="admin-stat-value">{mobilePercentage}%</span>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon-wrapper purple">
                <FaCompass />
              </div>
              <div className="admin-stat-content">
                <span className="admin-stat-label">Top Visited Page</span>
                <span className="admin-stat-value" style={{ fontSize: '18px' }}>
                  {topPage}
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Main Table Card */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div className="admin-toolbar" style={{ width: '100%', margin: 0 }}>
            <div className="admin-search-box">
              <FaMagnifyingGlass className="admin-search-icon" />
              <input
                type="text"
                placeholder="Search by real IP, city, visited page, or browser..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-search-input"
              />
            </div>

            <div className="admin-filter-tabs">
              <button
                className={`admin-tab-btn ${deviceFilter === 'all' ? 'active' : ''}`}
                onClick={() => setDeviceFilter('all')}
              >
                All Devices ({logs.length})
              </button>
              <button
                className={`admin-tab-btn ${deviceFilter === 'mobile' ? 'active' : ''}`}
                onClick={() => setDeviceFilter('mobile')}
              >
                Mobile ({mobileCount})
              </button>
              <button
                className={`admin-tab-btn ${deviceFilter === 'desktop' ? 'active' : ''}`}
                onClick={() => setDeviceFilter('desktop')}
              >
                Desktop ({totalViews - mobileCount})
              </button>
            </div>
          </div>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Visitor & IP</th>
                <th>Location</th>
                <th>Page Visited</th>
                <th>Device & OS</th>
                <th>Referral Source</th>
                <th>Exact Activity Time</th>
              </tr>
            </thead>
            <tbody>
              {showSkeleton ? (
                // Skeleton Rows
                [1, 2, 3, 4, 5, 6].map((rowIdx) => (
                  <tr key={rowIdx}>
                    <td>
                      <div className="admin-skeleton skeleton-line" style={{ width: '120px', marginBottom: '4px' }} />
                      <div className="admin-skeleton skeleton-line" style={{ width: '80px', height: '10px' }} />
                    </td>
                    <td>
                      <div className="admin-skeleton skeleton-line" style={{ width: '140px', marginBottom: '4px' }} />
                      <div className="admin-skeleton skeleton-line" style={{ width: '60px', height: '10px' }} />
                    </td>
                    <td>
                      <div className="admin-skeleton skeleton-line" style={{ width: '90px', height: '22px', borderRadius: '6px' }} />
                    </td>
                    <td>
                      <div className="admin-skeleton skeleton-line" style={{ width: '100px', marginBottom: '4px' }} />
                      <div className="admin-skeleton skeleton-line" style={{ width: '120px', height: '10px' }} />
                    </td>
                    <td>
                      <div className="admin-skeleton skeleton-line" style={{ width: '80px', height: '20px', borderRadius: '6px' }} />
                    </td>
                    <td>
                      <div className="admin-skeleton skeleton-line" style={{ width: '95px', marginBottom: '4px' }} />
                      <div className="admin-skeleton skeleton-line" style={{ width: '80px', height: '10px' }} />
                    </td>
                  </tr>
                ))
              ) : pageItems.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    <div className="admin-empty-state">
                      <FaGlobe className="admin-empty-icon" />
                      <p>No visitors recorded yet. Open any page on your website to log a live visit!</p>
                    </div>
                  </td>
                </tr>
              ) : (
                pageItems.map((v) => (
                  <tr key={v.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                        {v.ip}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{v.visitorId}</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#e2e8f0', fontWeight: 500 }}>
                        <FaLocationDot style={{ color: '#10b981', fontSize: '11px' }} />
                        {v.city}, {v.region || v.country}
                      </div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>{v.country}</div>
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-emerald" style={{ fontFamily: 'monospace', fontSize: '12.5px', padding: '4px 8px' }}>
                        {v.page}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {v.device === 'Mobile' ? (
                          <FaMobileScreenButton style={{ color: '#f59e0b' }} />
                        ) : (
                          <FaLaptop style={{ color: '#3b82f6' }} />
                        )}
                        <span style={{ fontWeight: 600 }}>{v.device}</span>
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>
                        {v.os} • {v.browser}
                      </div>
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-gray">{v.referrer}</span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <FaClock style={{ fontSize: '11px', color: '#10b981' }} />
                        {formatExactTime(v.timestamp)}
                      </div>
                      <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                        {formatExactDate(v.timestamp)}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!showSkeleton && pageItems.length > 0 && (
          <div className="admin-pagination">
            <span>
              Showing <strong>{startIdx + 1}</strong> -{' '}
              <strong>{Math.min(startIdx + rowsPerPage, filteredLogs.length)}</strong> of{' '}
              <strong>{filteredLogs.length}</strong> real visits
            </span>

            <div className="pagination-controls">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Previous
              </button>
              <span style={{ padding: '0 8px', color: '#f8fafc', fontWeight: 600 }}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
