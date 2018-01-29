const generateMeanderFor = require('./generator_1');

const time =  process.argv[2] || 500;
const gpio =  parseInt(process.argv[3]) || 21;

console.log(`Start for ${gpio} with interval ${time}`)
generateMeanderFor(gpio, time); // for 14 BCM pinm each 20 ms
