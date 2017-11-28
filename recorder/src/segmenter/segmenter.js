const _ = require('lodash');
const { EventEmitter } = require('events');


const N = 100;
const COUNT_OF_BLOCKS = 100;

/**
 * Provide filter wave
 * 
 * @example 
 *          const segmenter = new Segmenter();
            segmenter.on('segment', segment => {            
            });
            segmenter.findSegmant(wave)      
 **/
class Segmentor extends EventEmitter {
  constructor() {
    super()
    this._waves = [];
  }

  getSumOfMin (wave)  {
    const means = [];
    for (let index = 0; index < wave.length; index = index + N) {
        const slice = wave.slice(index, index + N);
    
        const mean = _.sumBy(slice, Math.abs);
        means.push(mean);
    }
    return _.min(_.flatten(means));
  }

  getSumOfAverage (wave)  {
    const means = [];
    for (let index = 0; index < wave.length; index = index + N) {
      const slice = wave.slice(index, index + N);

      const mean = _.sumBy(slice, Math.abs);
      means.push(mean);
    }
    return _.mean(_.flatten(means));
  }
}

module.exports = Segmentor;