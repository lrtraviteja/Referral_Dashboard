import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { signin } from '../api/auth';
import './LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // If already authenticated, redirect to dashboard
  if (Cookies.get('jwt_token')) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await signin(email, password);
      if (result?.data?.token) {
        Cookies.set('jwt_token', result.data.token);
        navigate('/');
      } else {
        setError('Invalid login response');
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Go Business</h1>
        <p className="login-tagline">Sign in to open your referral dashboard.</p>
        
        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-button">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
