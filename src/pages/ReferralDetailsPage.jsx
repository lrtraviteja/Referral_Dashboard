import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getReferrals } from '../api/referrals';
import { formatDate, formatCurrency } from '../utils/formatters';
import './ReferralDetailsPage.css';

export default function ReferralDetailsPage() {
  const { id } = useParams();
  const [referral, setReferral] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReferral = async () => {
      try {
        const response = await getReferrals({ id });
        const data = response.data;
        
        let found = null;
        if (data) {
          if (data.id && String(data.id) === String(id)) {
            found = data;
          } else if (Array.isArray(data.referrals)) {
            found = data.referrals.find(r => String(r.id) === String(id));
          } else if (Array.isArray(data)) {
            found = data.find(r => String(r.id) === String(id));
          }
        }
        
        setReferral(found);
      } catch (err) {
        if (err.status === 404) {
          setReferral(null);
        } else {
          setError(err.message || 'Failed to fetch referral details');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReferral();
  }, [id]);

  return (
    <div className="dashboard-layout">
      <Navbar />
      
      <main className="dashboard-main details-main">
        {loading ? (
          <div className="loading-state">Loading details...</div>
        ) : error ? (
          <div className="error-message" role="alert">{error}</div>
        ) : !referral ? (
          <div className="not-found-container">
            <h1>Referral not found</h1>
            <Link to="/" className="back-link">← Back to dashboard</Link>
          </div>
        ) : (
          <div className="details-wrapper">
            <Link to="/" className="back-link">← Back to dashboard</Link>
            <h1>Referral Details</h1>
            <p className="details-subtitle">Full information for this referral partner.</p>
            
            <div className="details-card">
              <div className="card-header">
                <h2 className="partner-name">{referral.name}</h2>
                <span className="service-badge">{referral.serviceName}</span>
              </div>
              <dl className="details-list">
                <div className="details-row">
                  <dt>REFERRAL ID</dt>
                  <dd>{referral.id}</dd>
                </div>
                <div className="details-row">
                  <dt>NAME</dt>
                  <dd>{referral.name}</dd>
                </div>
                <div className="details-row">
                  <dt>SERVICE NAME</dt>
                  <dd>{referral.serviceName}</dd>
                </div>
                <div className="details-row">
                  <dt>DATE</dt>
                  <dd>{formatDate(referral.date)}</dd>
                </div>
                <div className="details-row">
                  <dt>PROFIT</dt>
                  <dd className="profit-value">{formatCurrency(referral.profit)}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
