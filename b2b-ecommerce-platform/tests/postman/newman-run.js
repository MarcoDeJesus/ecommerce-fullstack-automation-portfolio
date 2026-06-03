const newman = require('newman');
const path = require('path');
const fs = require('fs');

const reportsDir = path.join(__dirname, 'reports');
const allureDir = path.join(__dirname, 'allure-results');
for (const dir of [reportsDir, allureDir]) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

newman.run(
  {
    collection: require('./ecommerce-collection.json'),
    environment: require('./ecommerce-environment.json'),
    reporters: ['cli', 'htmlextra', 'allure'],
    reporter: {
      htmlextra: {
        export: path.join(reportsDir, 'ecommerce-report.html'),
        title: 'B2B Ecommerce API Report',
      },
      allure: {
        export: allureDir,
      },
    },
  },
  (err, summary) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    process.exit(summary.run.failures.length ? 1 : 0);
  }
);
