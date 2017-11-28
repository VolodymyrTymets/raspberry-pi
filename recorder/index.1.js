const mic = require('mic');
const fs = require('fs');
const header = require("waveheader");
const keypress = require('keypress');
const jsonfile = require('jsonfile');
const WavDecoder = require('wav-decoder');
const { Segmenter } = require('./src/segmenter');

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

var micInstance = mic(micSettings);
var micInputStream = micInstance.getAudioStream();

var outputFileStream = fs.WriteStream(`./assets/${fileName}.raw`);
micInputStream.pipe(outputFileStream);

micInputStream.on('error', function(err) {
    cosole.log("Error in Input Stream: ");
    cosole.log(err);
});
 
micInstance.start();

process.stdin.on('keypress', function (ch, key) { 
  if (key && key.ctrl && key.name == 'c') {
    micInstance.stop();
    process.exit(1);
  }
});
process.stdin.setRawMode(true);