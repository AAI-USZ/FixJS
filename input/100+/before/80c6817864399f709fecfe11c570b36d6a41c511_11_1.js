function(_super) {

    __extends(NativeReadJsonPipe, _super);

    NativeReadJsonPipe.name = 'NativeReadJsonPipe';

    function NativeReadJsonPipe(log) {
      this.string = '';
      NativeReadJsonPipe.__super__.constructor.call(this, log);
    }

    NativeReadJsonPipe.prototype.processData = function(data) {
      return this.string += data;
    };

    NativeReadJsonPipe.prototype.processEnd = function() {
      var key, message, obj, value, _i, _len, _ref, _ref1, _ref2, _ref3;
      message = JSON.parse(this.string);
      if (message.header != null) {
        this.emitSDMX(sdmx.HEADER, message.header);
      }
      if (message.structures != null) {
        _ref = message.structures.codelists;
        for (key in _ref) {
          value = _ref[key];
          this.emitSDMX(sdmx.CODE_LIST, value);
        }
        _ref1 = message.structures.concepts;
        for (key in _ref1) {
          value = _ref1[key];
          this.emitSDMX(sdmx.CONCEPT_SCHEME, value);
        }
        _ref2 = message.structures.dataStructures;
        for (key in _ref2) {
          value = _ref2[key];
          this.emitSDMX(sdmx.DATA_STRUCTURE_DEFINITION, value);
        }
      }
      if (message.dataset != null) {
        if (message.dataset.data != null) {
          _ref3 = message.dataset.data;
          for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
            obj = _ref3[_i];
            if (obj.groupKey != null) {
              this.emitSDMX(sdmx.ATTRIBUTE_GROUP, obj);
            } else if (obj.seriesKey != null) {
              this.emitSDMX(sdmx.SERIES, obj);
            } else {
              this.emitSDMX(sdmx.DATA_SET_ATTRIBUTES, obj);
            }
          }
        }
      }
      return NativeReadJsonPipe.__super__.processEnd.apply(this, arguments);
    };

    return NativeReadJsonPipe;

  }