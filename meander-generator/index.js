const Gpio = require('onoff').Gpio;
const button = new Gpio(1, 'in');
const out = new Gpio(1, 'out');

console.log('Start');

button.watch(function(err, value) {
  console.log(`value of 1 input -> ${value}`)
});
out.writeSync(1);
console.log('end');
