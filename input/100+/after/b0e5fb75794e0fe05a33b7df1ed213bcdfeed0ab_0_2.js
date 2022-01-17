function (exports) {
  'use strict';

  var Poller, pollinterval, pollcount;

  Poller = function (endpoint, interval, totalcount) {
    this.__super__.constructor.call(this);
    this.endpoint = endpoint;
    this.interval = interval;
    this.totalcount = totalcount || 1000;
    this.lastpolled = null;
    this.count = 0;
  };

  Poller.prototype = new EventEmitter();
  Poller.prototype.constructor = Poller;
  Poller.prototype.__super__ = EventEmitter.prototype;

  Poller.prototype.poll = function () {
    // DEBUG
    console.log(this.count);
    if (this.count < this.totalcount) {
      var req, options = {};
      req = new Request();
      // XXX if (this.lastpolled) { options['after'] = this.lastpolled.toISOString() }
      req.on('success', function (data) {
        this.emit('poll', data);
      }, this);
      // DEBUG
      console.log('polling..');
      req.get(this.endpoint, options);
      this.lastpolled = new Date();
      this.count++;
      setTimeout(this.poll.bind(this), this.interval);
    }
  };

  exports.Poller = Poller;

}