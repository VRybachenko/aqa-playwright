const fs = require('fs');
const path = require('path');
const envConfig = require('./env.config');

module.exports = async () => {
    const env = process.env.ENV || 'qauto1';
    const resultsDir = path.join(__dirname, '..', `allure-results-${env}`);

    if (fs.existsSync(resultsDir)) {
        fs.rmSync(resultsDir, { recursive: true });
    }
    fs.mkdirSync(resultsDir, { recursive: true });

    fs.writeFileSync(
        path.join(resultsDir, 'environment.properties'),
        `ENV=${env}\nBASE_URL=${envConfig.baseUrl}\n`
    );
};