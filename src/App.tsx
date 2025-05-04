import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import RegisterDoctor from './pages/RegisterDoctor';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import AdminLogin from './pages/AdminLogin'; 
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<AdminLogin />} />

        
        <Route
          path="/*"
          element={
            <div className="app-container">
              <Sidebar />
              <div className="main-content">
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="register" element={<RegisterDoctor />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="reports" element={<Reports />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
