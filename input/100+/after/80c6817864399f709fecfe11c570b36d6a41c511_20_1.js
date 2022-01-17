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