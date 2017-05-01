const Gpio = require('onoff').Gpio;
const button = new Gpio(1, 'in');
// const out = new Gpio(1, 'out');

console.log('Start');

// button.watch(function(err, value) {
//   console.log(`value of 1 input -> ${value}`)
// });
button.writeSync(1);
const value = button.readSync();
console.log(`value of 1 input -> ${value}`)
console.log('end');
