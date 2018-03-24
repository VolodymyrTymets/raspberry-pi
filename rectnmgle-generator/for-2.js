const _ = require('lodash');
const sleep = require('sleep');
const Gpio = require('onoff').Gpio;

const freqArg = process.argv[2] || 1;
const frequently =  1000000 / freqArg;
const timeONinPersent =  process.argv[3] || 50;
const gpioNumber1 =  parseInt(process.argv[4]) || 14;
const gpioNumber2 =  parseInt(process.argv[5]) || 15;
const debug =  !!process.argv[6] || false;

let out1 = null;
let out2 = null;
let out1On = true;
let out2On = false;
let isOn = true;
let step = 1;

try {
  console.log(`run on gpio [${gpioNumber1}] [${gpioNumber2}] with frequently${freqArg} Hz (every ${frequently} and ${timeONinPersent}% on.`);
  out1 = new Gpio(gpioNumber1, 'out');
  out2 = new Gpio(gpioNumber2, 'out');
} catch (err) {
  console.log('GPIO is not detected!!!');
}

do {
  // const oneStepFrequently = frequently / 2;
  // const toSleep = !isOn ?
  //   oneStepFrequently * (timeONinPersent / 100) :
  //   oneStepFrequently - (oneStepFrequently * (timeONinPersent / 100));

  const toSleep = !isOn ?
    frequently * (timeONinPersent / 100) :
    frequently - (frequently * (timeONinPersent / 100));

  debug && console.log(`_________${step}___________`);
  if (step === 1) {
    debug && console.log(`[${1}] -> ${out1On ? 'on' : 'of'}`);
    out2 && out2.writeSync(0);
    out1 && out1.writeSync(out1On ? 1: 0);
    out1On = !out1On;
  } else {
    debug && console.log(`[${2}] -> ${out2On ? 'on' : 'of'}`);
    out1 && out1.writeSync(0);
    out2 && out2.writeSync(out2On ? 1: 0);
    out2On = !out2On;
  }
  isOn = !isOn;
  step ++;
  if (step > 2) {
    step = 1;
  }
  sleep.usleep(_.round(toSleep));
} while (true);