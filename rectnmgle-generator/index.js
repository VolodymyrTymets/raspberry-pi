const _ = require('lodash');
const sleep = require('sleep');
const Gpio = require('onoff').Gpio;

let out1 = null;
let out2 = null;
try {
  console.log(`run on gpio [14] [15]`);
  out1 = new Gpio(14, 'out');
  out2 = new Gpio(15, 'out');
} catch (err) {
  console.log('Error -> GPIO is not detected!!!');
  process.exit();
}

let step = 1;
const times = [
  process.argv[2] && parseInt(process.argv[2]) || 166,
  process.argv[3] && parseInt(process.argv[3]) || 166,
  process.argv[4] && parseInt(process.argv[4]) || 166,
  process.argv[5] && parseInt(process.argv[5]) || 166,
  process.argv[6] && parseInt(process.argv[6]) || 166,
  process.argv[7] && parseInt(process.argv[7]) || 166,
].map(t => t * 100);

console.log('times ->', times);

do {
  if(step === 7) {
    step = 1;
  }
  if(step === 2) {
    out1.writeSync(1)
  }
  if(step === 3) {
    out1.writeSync(0)
  }
  if(step === 5) {
    out2.writeSync(1)
  }
  if(step === 6) {
    out2.writeSync(0)
  }
  console.log('-->>',step);
  console.log('-- times[step] - 1>>',times[step] - 1);
  sleep.usleep(times[step] - 1);
  step ++;
} while (true);