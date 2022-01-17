function SubmitToRegistryPipe(log, registry) {
      this.registry = registry;
      this.submitCallback = __bind(this.submitCallback, this);

      SubmitToRegistryPipe.__super__.constructor.apply(this, arguments);
    }