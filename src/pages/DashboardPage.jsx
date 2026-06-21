import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getReferrals } from '../api/referrals';
import './DashboardPage.css';

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getReferrals();
        setData(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Referral Dashboard</h1>
          <p>Track your referrals, earnings, and partner activity in one place.</p>
        </header>

        {loading && <div className="loading-state">Loading dashboard...</div>}
        
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

            {/* Referrals Table Placeholder for Commit 4 */}
            <section className="referrals-table-section">
              <h2>All referrals</h2>
              <p>Table will be implemented in the next milestone.</p>
            </section>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
