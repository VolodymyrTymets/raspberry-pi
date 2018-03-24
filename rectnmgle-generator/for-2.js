const _ = require('lodash');
const sleep = require('sleep');
const Gpio = require('onoff').Gpio;

const freqArg = process.argv[2] || 1;
const frequently =  1000000 / freqArg;
const timeONinPersent =  process.argv[3] || 50;
const gpioNumber1 =  parseInt(process.argv[4]) || 14;
const gpioNumber2 =  parseInt(process.argv[5]) || 15;

let isOn = true;
let out1 = null;
let out2 = null;

try {
  console.log(`run on gpio [${gpioNumber1}] [${gpioNumber2}] with frequently${freqArg} Hz (every ${frequently} and ${timeONinPersent}% on.`);
  out1 = new Gpio(gpioNumber1, 'out');
  out2 = new Gpio(gpioNumber2, 'out');
} catch (err) {
  console.log('GPIO is not detected!!!');
}

do {
  const toSleep = !isOn ?
    frequently * (timeONinPersent / 100) :
    frequently - (frequently * (timeONinPersent / 100));
  isOn = !isOn;
  if (out1) {
    out1.writeSync(isOn ? 1: 0);
    out2.writeSync(isOn ? 0: 1);
  } else {
    console.log(isOn ? 'on': 'of');
  }
  sleep.usleep(_.round(toSleep));
} while (true);