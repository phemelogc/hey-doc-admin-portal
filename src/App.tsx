import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import RegisterDoctor from './pages/RegisterDoctor';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import AdminLogin from './pages/AdminLogin'; 
import { auth } from './firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import './App.css';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router basename="/hey-doc-admin-portal">
      <Routes>
        {/* Login Route */}
        <Route path="/" element={!isAuthenticated ? <AdminLogin /> : <Navigate to="/dashboard" />} />

        {/* Protected routes */}
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
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
              </div>
            </div>
          ) : (
            <Navigate to="/" />
          )}
        />
      </Routes>
    </Router>
  );
};

export default App;
