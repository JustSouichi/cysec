// backend/server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import vulnerability routes
const vulnerabilityRoutes = require('./routes/vulnerabilityRoutes');

const app = express();

// Middleware configuration
app.use(cors());
app.use(bodyParser.json());

// API routes
app.use('/api/vulnerabilities', vulnerabilityRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
