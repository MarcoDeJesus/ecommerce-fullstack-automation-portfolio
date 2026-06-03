const newman = require('newman');
const path = require('path');
const fs = require('fs');

const reportsDir = path.join(__dirname, 'reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

newman.run(
  {
    collection: require('./ecommerce-collection.json'),
    environment: require('./ecommerce-environment.json'),
    reporters: ['cli', 'htmlextra'],
    reporter: {
      htmlextra: {
        export: path.join(reportsDir, 'ecommerce-report.html'),
        title: 'B2B Ecommerce API Report',
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
