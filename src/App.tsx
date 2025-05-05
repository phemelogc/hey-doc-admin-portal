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
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router basename="/hey-doc-admin-portal">
      <Routes>
       
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <AdminLogin />} />

        
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <div className="app-container">
                <Sidebar />
                <div className="main-content">
                  <div className="top-bar">
                    
                  </div>
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="register" element={<RegisterDoctor />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </div>
              </div>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
