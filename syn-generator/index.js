const NodeSynth = require('nodesynth');

const frequently =  process.argv[2] || 440;
var ns = new NodeSynth.Synth({ bitDepth: 16, sampleRate: 44100 });
ns.play();

ns.source = new NodeSynth.Oscillator('sine', t => (parseInt(frequently) + ((t * 50) % 220)));