function DecodingPipe(log, registry) {
      this.log = log;
      this.registry = registry;
      this.callbackForQuery = __bind(this.callbackForQuery, this);

      this.lang = 'en';
      this.decoder = {};
      this.header = {};
      this.waiting = false;
      DecodingPipe.__super__.constructor.call(this, this.log);
    }