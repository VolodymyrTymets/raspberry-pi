const generateMeanderFor = require('./generator');

const time =  process.argv[3] || 500;
const gpio =  process.argv[4] || 21;

console.log('Start for 14:')
generateMeanderFor(gpio, time); // for 14 BCM pinm each 20 ms
