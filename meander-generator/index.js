const generateMicroMeanderFor = require('./generator_1');
const generateMeanderFor = require('./generator');
const generateDiffMeanderFor = require('./generator_2');

const time =  process.argv[2] || 500;
const gpio =  parseInt(process.argv[3]) || 21;
const type =  parseInt(process.argv[4]) || 'diff';
const generatorType = {
  micro: generateMicroMeanderFor,
  regular: generateMeanderFor,
  diff: generateDiffMeanderFor
};

console.log(`Start for ${gpio} with interval ${time}`)
generatorType[type](gpio, time); // for 14 BCM pinm each 20 ms
