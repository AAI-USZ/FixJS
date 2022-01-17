function(_super) {

    __extends(DecodingPipe, _super);

    DecodingPipe.name = 'DecodingPipe';

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

    DecodingPipe.prototype.processData = function(data) {
      var structure;
      this.log.debug("" + this.constructor.name + " processData");
      switch (data.type) {
        case sdmx.HEADER:
          this.header = data.data;
          break;
        case sdmx.DATA_SET_HEADER:
          if (!this.paused) {
            this.pause();
          }
          structure = this.header.structure[data.data.structureRef];
          this.decoder.obsDimension = structure.dimensionAtObservation;
          this.registry.query(sdmx.DATA_STRUCTURE_DEFINITION, structure.structureRef.ref, true, this.callbackForQuery);
          this.waiting = true;
          break;
        case sdmx.SERIES:
          if (!this.waiting) {
            decodeSeries(data.data, this.decoder, this.lang);
          }
      }
      return DecodingPipe.__super__.processData.call(this, data);
    };

    DecodingPipe.prototype.callbackForQuery = function(err, result) {
      var data, _i, _len, _ref;
      this.log.debug("" + this.constructor.name + " callbackForQuery");
      if (result == null) {
        throw new Error('Missing Data Structure Definition');
      }
      this.waiting = false;
      this.decoder = buildDecoder(result.dataStructureDefinitions, result.conceptSchemes, result.codeLists);
      _ref = this.queue.out;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        data = _ref[_i];
        if (data.name === 'data' && data.arg.type === sdmx.SERIES) {
          decodeSeries(data.arg.data, this.decoder, this.lang);
        }
      }
      return this.resume();
    };

    return DecodingPipe;

  }