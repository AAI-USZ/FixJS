function(_super) {

    __extends(SubmitToRegistryPipe, _super);

    SubmitToRegistryPipe.name = 'SubmitToRegistryPipe';

    function SubmitToRegistryPipe(log, registry) {
      this.registry = registry;
      this.submitCallback = __bind(this.submitCallback, this);

      SubmitToRegistryPipe.__super__.constructor.apply(this, arguments);
    }

    SubmitToRegistryPipe.prototype.processData = function(sdmxdata) {
      switch (sdmxdata.type) {
        case sdmx.CODE_LIST:
        case sdmx.CONCEPT_SCHEME:
        case sdmx.DATA_STRUCTURE_DEFINITION:
          this.pause();
          this.registry.submit(sdmxdata.data, this.submitCallback);
      }
      return SubmitToRegistryPipe.__super__.processData.apply(this, arguments);
    };

    SubmitToRegistryPipe.prototype.submitCallback = function(err) {
      if (err != null) {
        throw new Error(err);
      }
      return this.resume();
    };

    return SubmitToRegistryPipe;

  }