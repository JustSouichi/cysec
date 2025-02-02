// frontend/src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { getVulnerabilities, scanProject } from '../services/api';
import VulnerabilityList from './VulnerabilityList';
import Charts from './Charts';
import Notification from './Notification';

const Dashboard = () => {
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [scanResults, setScanResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleScan = async () => {
    setLoading(true);
    try {
      const response = await scanProject();
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
          <h2 className="mb-3">Scan Results Summary</h2>
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