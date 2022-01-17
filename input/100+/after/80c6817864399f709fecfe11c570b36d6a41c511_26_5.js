function ConvertCompactPipe(log, registry) {
      this.registry = registry;
      this.doCallbackForFind = __bind(this.doCallbackForFind, this);

      this.state = SETUP;
      this.dsd = {};
      this.convertQueue = [];
      ConvertCompactPipe.__super__.constructor.apply(this, arguments);
    }