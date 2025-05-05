import React, { useState, useEffect } from 'react';
import '../styles/AdminLogin.css'; 
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig'; 
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Forcin logout any existing session when this screen loads
  useEffect(() => {
    signOut(auth);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/Dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message.includes('wrong-password')) {
          setError('Incorrect password.');
        } else if (err.message.includes('user-not-found')) {
          setError('No user found with this email.');
        } else {
          setError('An unknown error occurred. Please try again.');
        }
      } else {
        setError('An unknown error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="admin-login-container">
      {/* Display login credentials for lecturer */}
      <div className="login-credentials-hint">
        <strong>Login Details:</strong><br />
        Email: <code>admin@docapp.com</code><br />
        Password: <code>adminRulez</code>
      </div>

      <div className="admin-login-card">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
