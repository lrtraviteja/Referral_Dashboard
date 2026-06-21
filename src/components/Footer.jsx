import './Footer.css';

export default function Footer() {
  return (
    <footer className="dashboard-footer">
      <div className="footer-container">
        <span className="brand-text">Go Business</span>
        <nav aria-label="Footer" className="footer-nav">
          <a href="#about" className="footer-link">About</a>
          <a href="#privacy" className="footer-link">Privacy</a>
        </nav>
        <div className="copyright">
          © 2024 Go Business
        </div>
      </div>
    </footer>
  );
}
