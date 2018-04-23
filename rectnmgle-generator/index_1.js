const _ = require('lodash');
const sleep = require('sleep');

const freqArg = process.argv[2] || 1;
const position = process.argv[3] || 1;
const stepTime = _.round((1000000 / freqArg) / 6);

console.log(stepTime, position);

const positionMap = {
  '1': [stepTime, stepTime, stepTime, stepTime, stepTime, stepTime],
  '2': [0, stepTime * 2, stepTime, 0, stepTime * 2, stepTime]
};


let step = 0;
const times = positionMap[position] || positionMap['1'];
console.log('times ->', times)

let str = '_';

do {
  if(step === 5) {
    step = 0;
    str = str + '  ';
  }
  if(step === 1) {
    str = str + '-'
  }
  str = str + '_';
  process.stdout.write(str);
  sleep.usleep(times[step]);
  step ++;
} while (true);