// backend/services/scannerService.js

const { exec } = require('child_process');
const config = require('../config/config');

// Function to run npm audit command and return the results
exports.scanProject = () => {
  return new Promise((resolve, reject) => {
    exec(config.auditCommand, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      let auditResult;
      try {
        auditResult = JSON.parse(stdout);
      } catch (parseError) {
        return reject(parseError);
      }
      resolve(auditResult);
    });
  });
};

// Function to run Retire.js and return the results in JSON format
exports.scanRetire = () => {
  return new Promise((resolve, reject) => {
    // The command uses Retire.js with JSON output
    exec('retire --outputformat json', (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      let retireResult;
      try {
        retireResult = JSON.parse(stdout);
      } catch (parseError) {
        return reject(parseError);
      }
      resolve(retireResult);
    });
  });
};
