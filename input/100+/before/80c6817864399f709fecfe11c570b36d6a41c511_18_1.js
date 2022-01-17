function(_super) {

    __extends(MegaPipe, _super);

    MegaPipe.name = 'MegaPipe';

    function MegaPipe(subpipes, log) {
      this.subpipes = subpipes;
      this.log = log;
      this.onDrain = __bind(this.onDrain, this);

      this.onError = __bind(this.onError, this);

      this.onEnd = __bind(this.onEnd, this);

      this.onData = __bind(this.onData, this);

      this.readable = true;
      this.writable = true;
      this.connectSubpipes();
      this.wireEvents();
    }

    MegaPipe.prototype.write = function(data) {
      this.log.debug("" + this.constructor.name + " write");
      return this.subpipes[0].write(data);
    };

    MegaPipe.prototype.end = function() {
      this.log.debug("" + this.constructor.name + " end");
      return this.subpipes[0].end();
    };

    MegaPipe.prototype.pause = function() {
      this.log.debug("" + this.constructor.name + " pause");
      return this.subpipes[this.subpipes.length - 1].pause();
    };

    MegaPipe.prototype.resume = function() {
      this.log.debug("" + this.constructor.name + " resume");
      return this.subpipes[this.subpipes.length - 1].resume();
    };

    MegaPipe.prototype.pump = function(source, destination) {
      if (source == null) {
        throw new Error('Pump must have source');
      }
      source.pipe(this);
      if (destination != null) {
        return this.pipe(destination);
      }
    };

    MegaPipe.prototype.onData = function(data) {
      this.log.debug("" + this.constructor.name + " onData");
      return this.emit('data', data);
    };

    MegaPipe.prototype.onEnd = function() {
      this.log.debug("" + this.constructor.name + " onEnd");
      this.cleanup();
      return this.emit('end');
    };

    MegaPipe.prototype.onError = function(err) {
      this.log.debug("" + this.constructor.name + " onError");
      this.cleanup();
      if (this.listeners('error').length === 0) {
        throw err;
      } else {
        return this.emit('error', err);
      }
    };

    MegaPipe.prototype.onDrain = function() {
      this.log.debug("" + this.constructor.name + " onDrain");
      return this.emit('drain');
    };

    MegaPipe.prototype.connectSubpipes = function() {
      var n, subpipe, _i, _len, _ref, _results;
      this.log.debug("" + this.constructor.name + " connectSubpipes");
      _ref = this.subpipes;
      _results = [];
      for (n = _i = 0, _len = _ref.length; _i < _len; n = ++_i) {
        subpipe = _ref[n];
        if (n < (this.subpipes.length - 1)) {
          _results.push(subpipe.pipe(this.subpipes[n + 1]));
        }
      }
      return _results;
    };

    MegaPipe.prototype.wireEvents = function() {
      var subpipe, _i, _len, _ref;
      this.log.debug("" + this.constructor.name + " wireEvents");
      _ref = this.subpipes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        subpipe = _ref[_i];
        subpipe.on('error', this.onError);
      }
      this.subpipes[0].on('drain', this.onDrain);
      this.subpipes[this.subpipes.length - 1].on('data', this.onData);
      return this.subpipes[this.subpipes.length - 1].on('end', this.onEnd);
    };

    MegaPipe.prototype.cleanup = function() {
      var subpipe, _i, _len, _ref;
      this.log.debug("" + this.constructor.name + " cleanup");
      _ref = this.subpipes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        subpipe = _ref[_i];
        subpipe.removeListener('error', this.onError);
      }
      this.subpipes[0].removeListener('drain', this.onDrain);
      this.subpipes[this.subpipes.length - 1].removeListener('data', this.onData);
      return this.subpipes[this.subpipes.length - 1].removeListener('end', this.onEnd);
    };

    return MegaPipe;

  }