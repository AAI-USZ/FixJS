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