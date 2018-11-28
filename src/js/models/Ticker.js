import { config } from '@config';

export class Ticker {
  constructor () {
    this.ticker = null;
    this.paused = false;
    this.fps = config.fps;
    this.frame = 0;
    this.cbs = [];
  }

  start() {
    this.runTicker.apply(this);
    
  }

  runTicker () {
    if(!this.cbs) this.cbs = [];
    var self = this;

    if(this.paused) {
      return;
    }
    
    this.cbs.forEach(  function(cb) {
      if(!self.paused) {
        cb.apply(self);
      }
    });
    self.frame += 1;

    if(this.paused) {
      return;
    }

    this.ticker = setTimeout(function() {
      self.runTicker.apply(self);
    }, 1000 / this.fps);
  }

  tick (cb) {
    if(!this.cbs) this.cbs = [];
    this.cbs.push(cb);
  }
}