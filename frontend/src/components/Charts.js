// frontend/src/components/Charts.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

const Charts = ({ scanResults }) => {
  const metadata = scanResults && scanResults.npmAudit && scanResults.npmAudit.metadata;
  const vulnerabilitiesCount = metadata
    ? metadata.vulnerabilities
    : { info: 0, low: 0, moderate: 0, high: 0, critical: 0 };

  const chartData = {
    labels: ['Info', 'Low', 'Moderate', 'High', 'Critical'],
    datasets: [
      {
        label: 'Vulnerabilities',
        data: [
          vulnerabilitiesCount.info || 0,
          vulnerabilitiesCount.low || 0,
          vulnerabilitiesCount.moderate || 0,
          vulnerabilitiesCount.high || 0,
          vulnerabilitiesCount.critical || 0,
        ],
        backgroundColor: ['gray', 'green', 'yellow', 'orange', 'red']
      }
    ]
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Vulnerability Chart</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default Charts;
