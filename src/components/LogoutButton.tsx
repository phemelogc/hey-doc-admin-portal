import { useNavigate } from 'react-router-dom';
import '../styles/logout-button.css';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    
    navigate("../pages/AdminLogin.tsx")
  };

  return (
    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
