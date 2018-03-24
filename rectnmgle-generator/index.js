const sleep = require('sleep');
const Gpio = require('onoff').Gpio;

const frequently =  process.argv[2] || 440;
const timeONinPersent =  process.argv[3] || 20;
const gpioNumber =  parseInt(process.argv[4]) || 21;

let isOn = true;
let out = null;
try {
  out = new Gpio(gpioNumber, 'out');
  console.log('run on gpio ->', gpioNumber);
} catch (err) {
  console.log('GPIO is not detected!!!');
}

do {
  const toSleep = !isOn ?
    frequently * (timeONinPersent / 100) :
    frequently - (frequently * (timeONinPersent / 100));
  isOn = !isOn;
  if (out) {
    out.writeSync(isOn);
    console.log(isOn ? 'on': 'of');
  } else {
    console.log(isOn ? 'on': 'of');
  }
  sleep.msleep(toSleep);
} while (true);