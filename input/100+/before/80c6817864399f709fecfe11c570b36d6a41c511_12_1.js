function(_super) {

    __extends(NativeWriteJsonPipe, _super);

    NativeWriteJsonPipe.name = 'NativeWriteJsonPipe';

    function NativeWriteJsonPipe(log) {
      this.message = [];
      NativeWriteJsonPipe.__super__.constructor.call(this, log);
    }

    NativeWriteJsonPipe.prototype.processData = function(sdmxData) {
      var data, _base, _base1, _base2, _base3, _base4, _base5, _base6, _base7;
      data = sdmxData.data;
      switch (sdmxData.type) {
        case sdmx.HEADER:
          return this.message.push(data);
        case sdmx.DATA_STRUCTURE_DEFINITION[1]:
          if ((_base = this.message)[1] == null) {
            _base[1] = {};
          }
          if ((_base1 = this.message[1]).dataStructures == null) {
            _base1.dataStructures = {};
          }
          return this.message.structures.dataStructures["" + data.agencyID + ":" + data.id + "(" + data.version + ")"] = data;
        case sdmx.CODE_LIST:
          if ((_base2 = this.message)[1] == null) {
            _base2[1] = {};
          }
          if ((_base3 = this.message[1]).codelists == null) {
            _base3.codelists = {};
          }
          return this.message[1].codelists["" + data.agencyID + ":" + data.id + "(" + data.version + ")"] = data;
        case sdmx.CONCEPT_SCHEME:
          if ((_base4 = this.message)[1] == null) {
            _base4[1] = {};
          }
          if ((_base5 = this.message[1]).concepts == null) {
            _base5.concepts = {};
          }
          return this.message[1].concepts["" + data.agencyID + ":" + data.id + "(" + data.version + ")"] = data;
        case sdmx.DATA_SET_HEADER:
          if ((_base6 = this.message)[1] == null) {
            _base6[1] = {};
          }
          this.message[2] = [];
          return this.message[2][0] = data;
        case sdmx.DATA_SET_ATTRIBUTES || sdmx.SERIES || sdmx.ATTRIBUTE_GROUP:
          if ((_base7 = this.message[2])[1] == null) {
            _base7[1] = [];
          }
          return this.message[2][1].push(data);
      }
    };

    NativeWriteJsonPipe.prototype.processEnd = function() {
      this.emitData(JSON.stringify(this.message));
      return NativeWriteJsonPipe.__super__.processEnd.apply(this, arguments);
    };

    return NativeWriteJsonPipe;

  }