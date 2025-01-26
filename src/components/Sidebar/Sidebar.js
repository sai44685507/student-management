import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import './Sidebar.css';

const Sidebar = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/'; // Redirect to login page after logout
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <ul>
        <li>
          <Link to="/students">Students Page</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
