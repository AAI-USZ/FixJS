function(_super) {

    __extends(SdmxPipe, _super);

    SdmxPipe.name = 'SdmxPipe';

    function SdmxPipe(log) {
      this.log = log;
      this.queueLengthMax = 1000;
      this.readable = true;
      this.writable = true;
      this.paused = false;
      this.waiting = false;
      this.queue = {};
      this.counters = {};
      this._init();
      SdmxPipe.__super__.constructor.apply(this, arguments);
    }

    SdmxPipe.prototype.write = function(data) {
      this.log.debug("" + this.constructor.name + " write " + (data.type != null ? data.type : data.length));
      this.counters.write += 1;
      this._count('in', data);
      if (!this.writable) {
        throw new Error("" + this.constructor.name + " write after end");
      }
      return this.processData(data);
    };

    SdmxPipe.prototype.end = function() {
      this.log.debug("" + this.constructor.name + " end");
      this.counters.end += 1;
      this.writable = false;
      this.processEnd();
      return this._pushToQueue('end');
    };

    SdmxPipe.prototype.pause = function() {
      this.log.debug("" + this.constructor.name + " pause");
      this.counters.pause += 1;
      return this.paused = true;
    };

    SdmxPipe.prototype.resume = function() {
      this.log.debug("" + this.constructor.name + " resume");
      this.counters.resume += 1;
      this.paused = false;
      return this._drain();
    };

    SdmxPipe.prototype.processData = function(data) {
      this.log.debug("" + this.constructor.name + " processData (default)");
      return this.emitData(data);
    };

    SdmxPipe.prototype.processEnd = function() {
      return this.log.debug("" + this.constructor.name + " processEnd");
    };

    SdmxPipe.prototype.emitData = function(data) {
      this.log.debug("" + this.constructor.name + " emitData");
      if (data != null) {
        this._count('out', data);
      }
      return this._pushToQueue('data', data);
    };

    SdmxPipe.prototype._init = function() {
      var key, _results;
      this.queue = {
        "in": [],
        out: []
      };
      this.counters = {
        write: 0,
        emit: 0,
        end: 0,
        pause: 0,
        resume: 0,
        wait: 0,
        "continue": 0,
        error: 0,
        "in": {
          missing: 0,
          unknown: 0,
          structure: 0,
          data: 0,
          objects: 0,
          chars: 0
        },
        out: {}
      };
      for (key in sdmxArtefacts) {
        this.counters["in"][key] = 0;
      }
      _results = [];
      for (key in this.counters["in"]) {
        _results.push(this.counters.out[key] = 0);
      }
      return _results;
    };

    SdmxPipe.prototype._pushToQueue = function(event, arg) {
      this.log.debug("" + this.constructor.name + " pushToQueue " + event);
      this.queue.out.push({
        name: event,
        arg: arg
      });
      return this._drain();
    };

    SdmxPipe.prototype._drain = function() {
      var event, isFull, wasFull;
      this.log.debug("" + this.constructor.name + " drain");
      wasFull = this.queueLengthMax < this.queue.out.length;
      while (0 < this.queue.out.length && !this.paused) {
        event = this.queue.out.shift();
        this.log.debug("" + this.constructor.name + " emit " + event.name);
        this.counters.emit += 1;
        this.emit(event.name, event.arg);
      }
      isFull = this.queueLengthMax < this.queue.out.length;
      if (isFull) {
        return false;
      } else {
        if (wasFull) {
          this.log.debug("" + this.constructor.name + " emit drain");
          this.emit('drain');
        }
        return true;
      }
    };

    SdmxPipe.prototype._count = function(direction, data) {
      if (data != null) {
        if (this.counters[direction][data.type] != null) {
          this.counters[direction][data.type] += 1;
        }
        if (this.counters[direction][data.type] == null) {
          this.counters[direction].unknown += 1;
        }
        if (sdmxStructures[data.type] != null) {
          this.counters[direction].structure += 1;
        }
        if (sdmxData[data.type] != null) {
          this.counters[direction].data += 1;
        }
        if (this.counters[direction][data.type] != null) {
          this.counters[direction].objects += 1;
        }
        if (data.length != null) {
          return this.counters[direction].chars += data.length;
        }
      } else {
        return this.counters[direction].missing += 1;
      }
    };

    return SdmxPipe;

  }