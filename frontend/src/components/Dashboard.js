import React, { useState, useEffect } from 'react';
import { getVulnerabilities, scanProject } from '../services/api';
import VulnerabilityList from './VulnerabilityList';
import Charts from './Charts';
import Notification from './Notification';

// Helper function to validate the target input.
// Permette: IPv4, URL con http/https e opzionalmente porta.
const isValidTarget = (input) => {
  input = input.trim();
  
  // Se l'input non inizia con http:// o https://, aggiungiamo http:// per la validazione.
  const hasProtocol = /^https?:\/\//i.test(input);
  const inputWithProtocol = hasProtocol ? input : `http://${input}`;
  
  try {
    const url = new URL(inputWithProtocol);
    // Regex per IPv4: quattro gruppi di 1-3 cifre separati da punti (0-255)
    const ipv4Regex = /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;
    return ipv4Regex.test(url.hostname);
  } catch (e) {
    return false;
  }
};

const Dashboard = () => {
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [scanResults, setScanResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [targetIP, setTargetIP] = useState('');

  const handleScan = async () => {
    if (!targetIP.trim()) {
      setNotification({ message: 'Please enter a target IP address.', type: 'error' });
      return;
    }
    if (!isValidTarget(targetIP)) {
      setNotification({ message: 'Invalid target. Please enter a valid IPv4 address, optionally with http/https and a port.', type: 'error' });
      return;
    }
    setLoading(true);
    try {
      const response = await scanProject(targetIP.trim());
      setScanResults(response.data);
      setNotification({ message: 'Scan completed successfully', type: 'success' });
    } catch (error) {
      console.error('Scan error:', error);
      setNotification({ message: 'Scan failed', type: 'error' });
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getVulnerabilities();
        setVulnerabilities(response.data.vulnerabilities);
      } catch (error) {
        console.error('Error fetching vulnerabilities:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">CySec Dashboard</h1>
      
      {/* Campo di input per il target IP */}
      <div className="d-flex justify-content-center mb-3">
        <input
          type="text"
          placeholder="Enter target IP (e.g., 192.168.1.1, http://192.168.1.1, 192.168.1.1:3000)"
          value={targetIP}
          onChange={(e) => setTargetIP(e.target.value)}
          className="form-control w-50"
        />
      </div>
      
      <div className="d-flex justify-content-center mb-4">
        <button 
          onClick={handleScan} 
          disabled={loading} 
          className="btn btn-custom btn-primary"
        >
          {loading ? 'Scanning...' : 'Run Security Scan'}
        </button>
      </div>
      
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      
      {scanResults && scanResults.npmAudit && scanResults.npmAudit.metadata && (
        <div className="mb-4">
          <h2 className="mb-3 text-center">Scan Results Summary</h2>
          <div className="card p-4">
            <p>
              <strong>Total Dependencies:</strong> {scanResults.npmAudit.metadata.dependencies.total}
            </p>
            <p>
              <strong>Total Vulnerabilities:</strong> {scanResults.npmAudit.metadata.vulnerabilities.total}
            </p>
          </div>
        </div>
      )}
      
      <Charts scanResults={scanResults} />
      <VulnerabilityList vulnerabilities={vulnerabilities} />
    </div>
  );
};

export default Dashboard;
