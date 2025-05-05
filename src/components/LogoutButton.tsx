// src/components/LogoutButton.tsx
import { useNavigate } from 'react-router-dom';
import '../styles/logout-button.css';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any session data if needed
    // localStorage.removeItem("authToken");
    navigate('/AdminLogin');
  };

  return (
    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
