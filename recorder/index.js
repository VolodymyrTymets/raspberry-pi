const mic = require('mic');
const fs = require('fs');
const header = require("waveheader");
const keypress = require('keypress');
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
const sums = []
let buffer = new Buffer([]);

var micInstance = mic(micSettings);
var micInputStream = micInstance.getAudioStream();
 
micInputStream.on('data', function(data) {
    buffer = Buffer.concat([buffer, data]);    
    WavDecoder.decode(Buffer.concat([header(micSettings.rate  * 1024, micSettings), data]))
    .then(audioData => {
      const wave = audioData.channelData[0]; 
      const sum = new Segmenter().getSum(wave);     
      sums.push(sum)
    })
    .catch(console.log);
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
      console.log(sums)
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