import React, { useState } from 'react';
import '../styles/AdminLogin.css'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig'; 
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Sign in using Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      // Navigate to the dashboard after successful login
      navigate('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        // Handle specific Firebase authentication errors
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
