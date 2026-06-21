import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('jwt_token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" aria-label="Go to dashboard home">
          Go Business
        </Link>
        <div className="navbar-links" aria-label="Primary">
          <Link to="/" className="nav-link">Home</Link>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Log out
        </button>
      </div>
    </nav>
  );
}
