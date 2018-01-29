//const Gpio = require('onoff').Gpio;

const generateMeanderFor = (number, time) => {
  let step = false;
  //const out = new Gpio(number, 'out');
  setInterval(function () {
    step = !step;
    if (step) {
      let previous = process.hrtime();
      let stepPrevious = process.hrtime();
      do {
        const now = process.hrtime();
        const diff = process.hrtime(previous);
        const stepDif = process.hrtime(stepPrevious);
        console.log('-->', diff[1] / 1000)
        previous = now;
        if (stepDif[1] / (1000 * 1000) > time) {
          stepPrevious = now;
          break;
        }
      }while (true);
    } else {
      out.writeSync(0);
    }
  }, time);
};

module.exports = generateMeanderFor;
