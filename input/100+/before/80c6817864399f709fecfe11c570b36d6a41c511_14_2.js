function(_super) {
    var calculateIndexMultipliers;

    __extends(WriteJsonProtoPipe, _super);

    WriteJsonProtoPipe.name = 'WriteJsonProtoPipe';

    function WriteJsonProtoPipe(log) {
      this.log = log;
      this.cache = [];
      this.dimensions = [];
      this.obsAttributes = [];
      this.obsAttributeDefaults = ['A', 'F'];
      this.codes = {};
      WriteJsonProtoPipe.__super__.constructor.apply(this, arguments);
    }

    WriteJsonProtoPipe.prototype.processData = function(data) {
      var attr, dim, i, obsDim, _i, _j, _len, _len1, _ref, _ref1;
      this.log.debug("" + this.constructor.name + " processData (default)");
      switch (data.type) {
        case sdmx.SERIES:
          if (this.counters["in"].series === 1) {
            for (dim in data.data.seriesKey) {
              this.dimensions.push(dim);
              this.codes[dim] = {};
            }
            this.codes['obsDimension'] = {};
            for (attr in data.data.obs.attributes) {
              this.obsAttributes.push(attr);
            }
          }
          _ref = this.dimensions;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            dim = _ref[_i];
            this.codes[dim][data.data.seriesKey[dim]] = null;
          }
          _ref1 = data.data.obs.obsDimension;
          for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
            obsDim = _ref1[i];
            this.codes['obsDimension'][obsDim] = null;
          }
          return this.cache.push(data.data);
      }
    };

    WriteJsonProtoPipe.prototype.processEnd = function() {
      this.log.debug("" + this.constructor.name + " processEnd");
      this.log.info("cache size " + this.cache.length);
      return this.buildMessage();
    };

    WriteJsonProtoPipe.prototype.buildMessage = function() {
      var attr, code, dim, i, index, j, msg, multipliers, obsDimCodes, obsIndex, series, value, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3, _ref4;
      msg = {
        codes: [],
        data: []
      };
      _ref = this.dimensions.concat('obsDimension');
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        dim = _ref[i];
        msg.codes[i] = Object.keys(this.codes[dim]).sort();
      }
      obsDimCodes = msg.codes[msg.codes.length - 1];
      multipliers = calculateIndexMultipliers(this.dimensions.concat('obsDimension'), this.codes);
      _ref1 = this.cache;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        series = _ref1[_j];
        index = 0;
        _ref2 = this.dimensions;
        for (i = _k = 0, _len2 = _ref2.length; _k < _len2; i = ++_k) {
          dim = _ref2[i];
          index += msg.codes[i].indexOf(series.seriesKey[dim]) * multipliers[dim];
        }
        _ref3 = series.obs.obsDimension;
        for (i = _l = 0, _len3 = _ref3.length; _l < _len3; i = ++_l) {
          code = _ref3[i];
          obsIndex = index + obsDimCodes.indexOf(code);
          value = [];
          value.push(series.obs.obsValue[i]);
          _ref4 = this.obsAttributes;
          for (j = _m = 0, _len4 = _ref4.length; _m < _len4; j = ++_m) {
            attr = _ref4[j];
            if (series.obs.attributes[attr] != null) {
              if (series.obs.attributes[attr][i] !== this.obsAttributeDefaults[j]) {
                value[j + 1] = series.obs.attributes[attr][i];
              }
            }
          }
          msg.data[obsIndex] = value;
        }
      }
      return this.emitData(JSON.stringify(msg));
    };

    calculateIndexMultipliers = function(dimensions, codes) {
      var dim, multipliers, prev, reversedDims, _i, _len;
      multipliers = {};
      reversedDims = dimensions.slice().reverse();
      prev = 1;
      for (_i = 0, _len = reversedDims.length; _i < _len; _i++) {
        dim = reversedDims[_i];
        multipliers[dim] = prev;
        prev = Object.keys(codes[dim]).length * prev;
      }
      return multipliers;
    };

    return WriteJsonProtoPipe;

  }