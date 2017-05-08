const Gpio = require('onoff').Gpio;

const generateMeanderFor = (number, time) => {
  const out = new Gpio(number, 'out');
  setInterval(function () {
    out.writeSync(out.readSync() ^ 1);
  }, time);
}

module.exports = generateMeanderFor;
