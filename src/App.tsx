import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import RegisterDoctor from './pages/RegisterDoctor';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import AdminLogin from './pages/AdminLogin'; 
import './App.css';

const App = () => {
  // Example logic for checking if the user is authenticated
  const isAuthenticated = false; // Set this to true after login

  return (
    <Router basename="/hey-doc-admin-portal">
      <Routes>
        {/* Login route */}
        <Route path="/" element={<AdminLogin />} />

        {/* Protected routes after login */}
        <Route
          path="/*"
          element={isAuthenticated ? (
            <div className="app-container">
              <Sidebar />
              <div className="main-content">
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="register" element={<RegisterDoctor />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="reports" element={<Reports />} />
                  {/* Redirect to dashboard by default */}
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
              </div>
            </div>
          ) : (
            // Redirect to login page if not authenticated
            <Navigate to="/" />
          )}
        />
      </Routes>
    </Router>
  );
};

export default App;
