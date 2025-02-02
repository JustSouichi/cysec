// frontend/src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { getVulnerabilities, scanProject } from '../services/api';
import VulnerabilityList from './VulnerabilityList';
import Charts from './Charts';

const Dashboard = () => {
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [scanResults, setScanResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to trigger a scan via POST
  const handleScan = async () => {
    setLoading(true);
    try {
      const response = await scanProject();
      setScanResults(response.data);
      // If desired, update vulnerabilities from the audit report
      if (response.data.npmAudit && response.data.npmAudit.metadata) {
        // Here you can extract specific details if needed
        setVulnerabilities([]);
      }
    } catch (error) {
      console.error('Scan error:', error);
    }
    setLoading(false);
  };

  // Optionally, load vulnerabilities on component mount (dummy GET)
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
    <div>
      <h1>CySec Dashboard</h1>
      <button onClick={handleScan} disabled={loading}>
        {loading ? 'Scanning...' : 'Run Security Scan'}
      </button>
      {scanResults && (
        <div>
          <h2>Scan Results</h2>
          <pre>{JSON.stringify(scanResults, null, 2)}</pre>
        </div>
      )}
      <Charts scanResults={scanResults} />
      <VulnerabilityList vulnerabilities={vulnerabilities} />
    </div>
  );
};

export default Dashboard;
