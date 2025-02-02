// frontend/src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: '/api'
});

// GET vulnerabilities (for example, for initial load)
export const getVulnerabilities = () => API.get('/vulnerabilities');

// POST to trigger a scan
export const scanProject = () => API.post('/vulnerabilities/scan');

export default API;
