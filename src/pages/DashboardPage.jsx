import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getReferrals } from '../api/referrals';
import { formatDate, formatCurrency } from '../utils/formatters';
import './DashboardPage.css';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Table state
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getReferrals({ search, sort });
        setData(response.data);
        // Reset to page 1 on new search or sort data fetching
        setCurrentPage(1);
      } catch (err) {
        setError(err.message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };
    
    // Add debounce for search to avoid hitting API on every keystroke
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [search, sort]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Pagination calculations
  const referrals = data?.referrals || [];
  const totalEntries = referrals.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);
  
  const fromIndex = (currentPage - 1) * rowsPerPage;
  const toIndex = Math.min(fromIndex + rowsPerPage, totalEntries);
  const currentRows = referrals.slice(fromIndex, toIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Referral Dashboard</h1>
          <p>Track your referrals, earnings, and partner activity in one place.</p>
        </header>

        {loading && !data && <div className="loading-state">Loading dashboard...</div>}
        
        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        {data && (
          <div className="dashboard-content">
            <section className="overview-section" role="region" aria-label="Overview metrics">
              <h2>Overview</h2>
              <div className="metrics-grid">
                {data.metrics?.map((metric) => (
                  <div key={metric.id || metric.label} className="metric-card">
                    <span className="metric-label">{metric.label}</span>
                    <span className="metric-value">{metric.value}</span>
                  </div>
                ))}
              </div>
            </section>

            <div className="panels-grid">
              <section className="service-summary-section" aria-label="Service summary">
                <h2>Service summary</h2>
                <div className="summary-card">
                  <div className="summary-item">
                    <span className="summary-label">Service</span>
                    <span className="summary-value">{data.serviceSummary?.service}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Your Referrals</span>
                    <span className="summary-value">{data.serviceSummary?.yourReferrals}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Active Referrals</span>
                    <span className="summary-value">{data.serviceSummary?.activeReferrals}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Total Ref. Earnings</span>
                    <span className="summary-value">{data.serviceSummary?.totalRefEarnings}</span>
                  </div>
                </div>
              </section>

              <section className="share-referral-section" aria-label="Share referral">
                <h2>Refer friends and earn more</h2>
                <div className="share-card">
                  <div className="share-field">
                    <label>Your Referral Link</label>
                    <div className="copy-group">
                      <input type="text" readOnly value={data.referral?.link || ''} />
                      <button onClick={() => handleCopy(data.referral?.link)}>Copy</button>
                    </div>
                  </div>
                  <div className="share-field">
                    <label>Your Referral Code</label>
                    <div className="copy-group">
                      <input type="text" readOnly value={data.referral?.code || ''} />
                      <button onClick={() => handleCopy(data.referral?.code)}>Copy</button>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <section className="referrals-table-section">
              <h2>All referrals</h2>
              
              <div className="table-controls">
                <input 
                  type="text" 
                  className="search-input"
                  placeholder="Name or service…"
                  aria-label="Search referrals"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                
                <label className="sort-label">
                  <span className="visually-hidden">Sort by date</span>
                  <select 
                    value={sort} 
                    onChange={(e) => setSort(e.target.value)}
                    className="sort-select"
                  >
                    <option value="desc">Newest first</option>
                    <option value="asc">Oldest first</option>
                  </select>
                </label>
              </div>

              <div className="table-wrapper">
                <table className="referrals-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Service</th>
                      <th>Date</th>
                      <th>Profit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRows.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="empty-state">No matching entries</td>
                      </tr>
                    ) : (
                      currentRows.map((row) => (
                        <tr 
                          key={row.id} 
                          onClick={() => navigate(`/referral/${row.id}`)}
                          className="clickable-row"
                        >
                          <td>{row.name}</td>
                          <td>{row.serviceName}</td>
                          <td>{formatDate(row.date)}</td>
                          <td>{formatCurrency(row.profit)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {totalEntries > 0 && (
                <div className="pagination-footer">
                  <span className="pagination-summary">
                    Showing {fromIndex + 1}–{toIndex} of {totalEntries} entries
                  </span>
                  
                  <div className="pagination-controls">
                    <button 
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="page-button prev-next"
                    >
                      Previous
                    </button>
                    
                    {totalPages > 1 && Array.from({ length: totalPages }).map((_, idx) => {
                      const pageNum = idx + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`page-button ${currentPage === pageNum ? 'active' : ''}`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button 
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="page-button prev-next"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
