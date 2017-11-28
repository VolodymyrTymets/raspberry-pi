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
const sumOfMins = [];
const sumOfAverages = [];
let buffer = new Buffer([]);

var micInstance = mic(micSettings);
var micInputStream = micInstance.getAudioStream();
 
micInputStream.on('data', function(data) {
    buffer = Buffer.concat([buffer, data]);    
    WavDecoder.decode(Buffer.concat([header(micSettings.rate  * 1024, micSettings), data]))
    .then(audioData => {
      const wave = audioData.channelData[0]; 
      const sumOfMin = new Segmenter().getSumOfMin(wave);
      const sumOfAverage = new Segmenter().getSumOfAverage(wave);
      console.log('sum ->', wave)
      sumOfMins.push(sumOfMin);
      sumOfAverages.push(sumOfAverage);
    })
    .catch(console.log);
});
 
micInputStream.on('error', function(err) {
    cosole.log("Error in Input Stream: ");
    cosole.log(err);
});
 
micInputStream.on('stopComplete', function() {
    const all = Buffer.concat([header(micSettings.rate  * 1024, micSettings) , buffer]);
    WavDecoder.decode(all)
      .then(audioData => {
        fs.writeFile(`./assets/${fileName}.wav`, all, err => {
          if(err) {
            console.log(err);
            process.exit(0);
          }
          jsonfile.writeFile(`./assets/${fileName}.json`, {
            total: audioData.channelData[0].length,
            slices: sumOfMins.length,
            sumOfMin: sumOfMins,
            sumOfAverages: sumOfAverages
          }, () => {
            console.log('Recored Successful...')
            process.exit(1);
          });
        });
      })
      .catch(console.log);

});

micInstance.start();

process.stdin.on('keypress', function (ch, key) { 
  if (key && key.ctrl && key.name == 'c') {
    micInstance.stop();
  }
});
process.stdin.setRawMode(true);