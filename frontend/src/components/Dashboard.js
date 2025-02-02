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
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">CySec Dashboard</h1>
      <button 
        onClick={handleScan} 
        disabled={loading} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? 'Scanning...' : 'Run Security Scan'}
      </button>
      {scanResults && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold mb-2">Scan Results</h2>
          <pre className="bg-gray-100 p-2 rounded overflow-auto">
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
