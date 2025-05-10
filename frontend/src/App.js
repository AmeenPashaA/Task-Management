// ===================================================================
// App.js - Main Routing Component
// Developed by Ameen Pasha.A as a task assignment given by INDPRO company
//
// ▸ Description:
//   Centralized React Router configuration to manage navigation between
//   Login, Signup, and Dashboard components/pages.
//
// ▸ Technologies Used:
//   - React.js
//   - react-router-dom v6
//
// ▸ Pages Included:
//   - LoginPage ("/")
//   - SignUpPage ("/signup")
//   - DashboardPage ("/dashboard")
//
// ===================================================================

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUps'; // Make sure the file path is correct
import DashboardPage from './pages/Navbar'; // Make sure to import the DashboardPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardPage />} /> {/* Added route for DashboardPage */}
      </Routes>
    </Router>
  );
}

export default App;
