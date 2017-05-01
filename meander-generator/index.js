const Gpio = require('onoff').Gpio;
const button = new Gpio(1, 'in', 'both');

console.log('Start');

button.watch(function(err, value) {
  console.log(`value of 1 input -> ${value}`)
});
console.log('end');
