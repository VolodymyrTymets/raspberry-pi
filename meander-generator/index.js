const Gpio = require('onoff').Gpio;
const led = new Gpio(14, 'out'),
// const out = new Gpio(1, 'out');

console.log('----------------------> Start')

// button.watch(function(err, value) {
//   console.log(`value of 1 input -> ${value}`)
// });

// Toggle the state of the LED on GPIO #14 every 200ms.
// Here synchronous methods are used. Asynchronous methods are also available.
const iv = setInterval(function () {
  led.writeSync(led.readSync() ^ 1); // 1 = on, 0 = off :)
}, 200);

const ivlog = setInterval(function () {
  const value = led.readSync();
  console.log(`value of 14 input -> ${value}`);
}, 50);
// Stop blinking the LED and turn it off after 5 seconds.
setTimeout(function () {
  clearInterval(iv); // Stop blinking
  clearInterval(ivlog);
  led.writeSync(0);  // Turn LED off.
  led.unexport();    // Unexport GPIO and free resources
  console.log('----------------------> End')
}, 5000);
