import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <div>Dashboard Page placeholder (will add Navbar and log out here later)</div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/referrals" 
          element={<Navigate to="/" replace />} 
        />
        <Route 
          path="/referral/:id" 
          element={
            <ProtectedRoute>
              <div>Referral Details</div>
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
