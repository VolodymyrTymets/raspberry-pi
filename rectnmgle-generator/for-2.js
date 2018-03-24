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
let turnOn = 1;

try {
  console.log(`run on gpio [${gpioNumber1}] [${gpioNumber2}] with frequently${freqArg} Hz (every ${frequently} and ${timeONinPersent}% on.`);
  out1 = new Gpio(gpioNumber1, 'out');
  out2 = new Gpio(gpioNumber2, 'out');
  out1.writeSync(0);
  out2.writeSync(0);

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
  isOn = !isOn;
  turnOn = !isOn ? 2: 1;

  if (out1) {
    if (turnOn === 1) {
      console.log(`[${1}] -> ${isOn ? 'on' : 'of'}`);
      out1.writeSync(isOn ? 1: 0);
      out2.writeSync(0);
    }
    if(turnOn === 2) {
      console.log(`[${2}] -> ${isOn ? 'on' : 'of'}`);
      out1.writeSync(0);
      out2.writeSync(isOn ? 1: 0);
    }
  } else {
    if (turnOn === 1) {
      console.log(isOn ? '1-> on': '1 -> of');
    } else {
      console.log(isOn ? '2 -> on': '2 -> of');
    }

  }
  sleep.usleep(_.round(toSleep));
} while (true);