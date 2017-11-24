var mic = require('mic');
var fs = require('fs');
const header = require("waveheader");
var keypress = require('keypress');

const micMunber = process.argv[2];
const fileName = process.argv[3];

keypress(process.stdin);

const micSettings =  {
  rate: 44100,
  channels: 2,
  bitwidth: 16,
  debug: false,
  exitOnSilence: 6,
  device: `plughw:${micMunber}`,
};

let buffer = new Buffer([]);

var micInstance = mic(micSettings);
var micInputStream = micInstance.getAudioStream();
 
micInputStream.on('data', function(data) {
    buffer = Buffer.concat([buffer, data]);
});
 
micInputStream.on('error', function(err) {
    cosole.log("Error in Input Stream: ");
    cosole.log(err);
});
 
micInputStream.on('stopComplete', function() {
    const all = Buffer.concat([header(micSettings.rate  * 1024, micSettings) , buffer]);
    fs.writeFile(`./assets/${fileName}.wav`, all, err => {
      if(err) {
        console.log(err);
        process.exit(0);
      }
      console.log('Recored Successful...')
      process.exit(1);
    });
});

micInstance.start();

process.stdin.on('keypress', function (ch, key) { 
  if (key && key.ctrl && key.name == 'c') {
    micInstance.stop();
  }
});
process.stdin.setRawMode(true);