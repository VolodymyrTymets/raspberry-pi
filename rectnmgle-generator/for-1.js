const _ = require('lodash');
const sleep = require('sleep');
const Gpio = require('onoff').Gpio;

const freqArg = process.argv[2] || 1;
const frequently =  1000000 / freqArg;
const timeONinPersent =  process.argv[3] || 50;
const gpioNumber =  parseInt(process.argv[4]) || 14;

let isOn = true;
let out = null;
try {
  console.log(`run on gpio [${gpioNumber}] with frequently ${freqArg} Hz (every ${frequently} microseconds) and ${timeONinPersent}% on.`);
  out = new Gpio(gpioNumber, 'out');
 } catch (err) {
  console.log('Error -> GPIO is not detected!!!');
}

do {
  const toSleep = !isOn ?
    frequently * (timeONinPersent / 100) :
    frequently - (frequently * (timeONinPersent / 100));
  isOn = !isOn;
  if (out) {
    out.writeSync(isOn ? 1: 0);
  } else {
    console.log(isOn ? 'on': 'of');
  }
  sleep.usleep(_.round(toSleep));
} while (true);