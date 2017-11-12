const generateMeanderFor = require('./generator');

const time =  process.argv[3] || 500;
const gpio =  parseInt(process.argv[4]) || 21;

console.log(`Start for ${gpio} with interval ${time}`)
generateMeanderFor(gpio, time); // for 14 BCM pinm each 20 ms
