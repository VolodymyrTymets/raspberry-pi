const _ = require('lodash');
const sleep = require('sleep');

const freqArg = process.argv[2] || 1;
const frequently =  1000000 / freqArg;
const timeONinPersent =  process.argv[3] || 50;
const gpioNumber1 =  parseInt(process.argv[4]) || 14;
const gpioNumber2 =  parseInt(process.argv[5]) || 15;
const debug =  !!process.argv[6] || false;

let step = 0;
const times = [50, 50, 50, 50, 50, 50];

let str = '_';

do {
  sleep.usleep(times[step] * 100);

  step ++;
  if(step > 5) {
    step = 0;
    str = str + '  ';
  }
  if(step === 2) {
    str = str + '-'
  }
  str = str + '_';
  process.stdout.write(str);
} while (true);