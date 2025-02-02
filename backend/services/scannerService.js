// backend/services/scannerService.js

const { exec } = require('child_process');
const config = require('../config/config');

exports.scanProject = (targetIP) => {
  return new Promise((resolve, reject) => {
    // Esempio: esegue un comando di scansione che potrebbe usare targetIP
    // In questo esempio usiamo npm audit senza effettivamente usare targetIP.
    const command = `npm audit --json`;
    exec(command, (error, stdout, stderr) => {
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

exports.scanRetire = (targetIP) => {
  return new Promise((resolve, reject) => {
    // Esempio: esegue Retire.js (senza targetIP, per questo esempio)
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
