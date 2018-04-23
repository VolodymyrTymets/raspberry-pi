const _ = require('lodash');
const sleep = require('sleep');

let step = 0;
const times = [
  process.argv[2] && parseInt(process.argv[2]) || 166,
  process.argv[3] && parseInt(process.argv[3]) || 166,
  process.argv[4] && parseInt(process.argv[4]) || 166,
  process.argv[5] && parseInt(process.argv[5]) || 166,
  process.argv[6] && parseInt(process.argv[6]) || 166,
  process.argv[7] && parseInt(process.argv[7]) || 166,
].map(t => t * 100);

console.log('times ->', times)
let str = '_';

do {
  sleep.usleep(times[step]);

  step ++;
  if(step === 5) {
    step = 0;
    str = str + '  ';
  }
  if(step === 2) {
    str = str + '-'
  }
  str = str + '_';
  process.stdout.write(str);
} while (true);