// frontend/src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { getVulnerabilities, scanProject } from '../services/api';
import VulnerabilityList from './VulnerabilityList';
import Charts from './Charts';

const Dashboard = () => {
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [scanResults, setScanResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScan = async () => {
    setLoading(true);
    try {
      const response = await scanProject();
      setScanResults(response.data);
    } catch (error) {
      console.error('Scan error:', error);
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
    <div className="container mt-4">
      <h1 className="mb-4">CySec Dashboard</h1>
      <button 
        onClick={handleScan} 
        disabled={loading} 
        className="btn btn-primary mb-3"
      >
        {loading ? 'Scanning...' : 'Run Security Scan'}
      </button>
      {scanResults && (
        <div className="mb-4">
          <h2>Scan Results</h2>
          <pre className="bg-light p-3 rounded">
            {JSON.stringify(scanResults, null, 2)}
          </pre>
        </div>
      )}
      <Charts scanResults={scanResults} />
      <VulnerabilityList vulnerabilities={vulnerabilities} />
    </div>
  );
};

export default Dashboard;
