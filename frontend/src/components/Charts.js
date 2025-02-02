// frontend/src/components/Charts.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = ({ scanResults }) => {
  if (
    !scanResults ||
    !scanResults.npmAudit ||
    !scanResults.npmAudit.metadata ||
    !scanResults.npmAudit.metadata.vulnerabilities
  ) {
    const defaultData = {
      labels: ['Safe'],
      datasets: [
        {
          data: [100],
          backgroundColor: ['green'],
        },
      ],
    };
    return (
      <div className="mt-4" style={{ maxWidth: '250px', margin: '0 auto', height: '250px' }}>
        <h2 className="text-center">Vulnerability Distribution</h2>
        <Pie data={defaultData} options={{ maintainAspectRatio: false }} />
        <p className="mt-2 text-center">Your project is safe.</p>
      </div>
    );
  }

  const vulnerabilities = scanResults.npmAudit.metadata.vulnerabilities;
  const total = vulnerabilities.total || 0;
  let safePercent = 0;
  let moderatePercent = 0;
  let dangerousPercent = 0;

  if (total === 0) {
    safePercent = 100;
  } else {
    const safeCount = (vulnerabilities.info || 0) + (vulnerabilities.low || 0);
    const moderateCount = vulnerabilities.moderate || 0;
    const dangerousCount = (vulnerabilities.high || 0) + (vulnerabilities.critical || 0);
    safePercent = Math.round((safeCount / total) * 100);
    moderatePercent = Math.round((moderateCount / total) * 100);
    dangerousPercent = Math.round((dangerousCount / total) * 100);
  }

  const data = {
    labels: ['Safe', 'Moderate', 'Dangerous'],
    datasets: [
      {
        data: [safePercent, moderatePercent, dangerousPercent],
        backgroundColor: ['green', 'yellow', 'red'],
      },
    ],
  };

  return (
    <div className="mt-4" style={{ maxWidth: '250px', margin: '0 auto', height: '250px' }}>
      <h2 className="text-center">Vulnerability Distribution</h2>
      <Pie data={data} options={{ maintainAspectRatio: false }} />
      <div className="mt-2 text-center">
        <p>Safe: {safePercent}%</p>
        <p>Moderate: {moderatePercent}%</p>
        <p>Dangerous: {dangerousPercent}%</p>
      </div>
    </div>
  );
};

export default Charts;
