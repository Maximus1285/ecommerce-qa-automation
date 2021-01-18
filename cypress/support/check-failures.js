const result = require('../results/mochawesome-full.json');

if (result.stats.failures > 0) process.exit(result.stats.failures);
