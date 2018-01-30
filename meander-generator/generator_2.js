const Gpio = require('onoff').Gpio;

const generateMeanderFor = (number, time) => {
    const timeOf = time * 0.2;
    const out = new Gpio(number, 'out');
    setInterval(function () { // off
        out.writeSync(0);
    }, timeOf);
    setInterval(function () { // on
        out.writeSync(1);
    }, time - timeOf);
};

module.exports = generateMeanderFor;
