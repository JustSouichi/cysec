// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import VulnerabilityDetails from './components/VulnerabilityDetails'; // da creare

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/vulnerability/:id" element={<VulnerabilityDetails />} />
      </Routes>
    </Router>
  );
}

export default App;