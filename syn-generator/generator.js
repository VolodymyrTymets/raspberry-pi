var Generator = require('audio-generator/stream');
var Speaker = require('audio-speaker/stream');

const frequently =  process.argv[2] || 440;

Generator(
  //Generator function, returns sample values -1..1 for channels
  function (time) {
    return [
      Math.sin(Math.PI * 2 * time * parseInt(frequently)), //channel 1
      Math.sin(Math.PI * 2 * time * parseInt(frequently)), //channel 2
    ]
  },

  {
    //Duration of generated stream, in seconds, after which stream will end.
    duration: Infinity,

    //Periodicity of the time.
    period: Infinity
  })
  .on('error', function (e) {
    //error happened during generation the frame
  })
  .pipe(Speaker());