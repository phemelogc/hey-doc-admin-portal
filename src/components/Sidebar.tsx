import { NavLink } from 'react-router-dom';
import '../styles/sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active-link" : ""}>Dashboard</NavLink>
        <NavLink to="/register" className={({ isActive }) => isActive ? "active-link" : ""}>Register Doctor</NavLink>
        <NavLink to="/analytics" className={({ isActive }) => isActive ? "active-link" : ""}>Analytics</NavLink>
        <NavLink to="/reports" className={({ isActive }) => isActive ? "active-link" : ""}>Reports</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
