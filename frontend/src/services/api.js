import axios from 'axios';

const API = axios.create({
  baseURL: '/api'
});

// GET vulnerabilities
export const getVulnerabilities = () => API.get('/vulnerabilities');

// POST to trigger a scan; accepts a targetIP parameter
export const scanProject = (targetIP) => API.post('/vulnerabilities/scan', { targetIP });

export default API;
