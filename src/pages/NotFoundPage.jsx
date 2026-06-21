import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page not found</h2>
        <Link to="/" className="back-link">← Back to dashboard</Link>
      </div>
    </div>
  );
}
