function(_super) {
    var calculateFrameOfReference, calculateIndexMultipliers, calculateObsAttributeDefaults;

    __extends(WriteJsonProtoPipe, _super);

    function WriteJsonProtoPipe(log) {
      this.log = log;
      this.cache = [];
      this.dimensions = [];
      this.obsAttributes = [];
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
      var attr, code, dim, frameOfReference, i, index, j, msg, multipliers, obsAttributeDefaults, obsDimCodes, obsIndex, series, value, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3, _ref4;
      msg = {
        codes: [],
        data: []
      };
      obsAttributeDefaults = [];
      frameOfReference = null;
      this.log.info("starting to build the message");
      _ref = this.dimensions.concat('obsDimension');
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        dim = _ref[i];
        msg.codes[i] = Object.keys(this.codes[dim]).sort();
      }
      obsDimCodes = msg.codes[msg.codes.length - 1];
      multipliers = calculateIndexMultipliers(this.dimensions.concat('obsDimension'), this.codes);
      obsAttributeDefaults = calculateObsAttributeDefaults(this.cache, this.obsAttributes);
      this.log.info(util.inspect(obsAttributeDefaults, true, null));
      frameOfReference = calculateFrameOfReference(this.cache);
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
              if (series.obs.attributes[attr][i] !== obsAttributeDefaults[j]) {
                value[j + 1] = series.obs.attributes[attr][i];
              }
            }
          }
          msg.data[obsIndex] = value;
        }
      }
      this.log.info("starting to stringify json");
      this.emitData(JSON.stringify(msg));
      return this.log.info("finished building the message");
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

    calculateObsAttributeDefaults = function(cache, obsAttributes) {
      var attr, count, i, j, maxCount, maxValue, obsAttributeDefaults, obsAttributeValueCounts, series, value, _i, _j, _k, _l, _len, _len1, _len2, _ref, _ref1;
      obsAttributeValueCounts = {};
      for (_i = 0, _len = obsAttributes.length; _i < _len; _i++) {
        attr = obsAttributes[_i];
        obsAttributeValueCounts[attr] = {};
      }
      for (_j = 0, _len1 = cache.length; _j < _len1; _j++) {
        series = cache[_j];
        for (i = _k = 0, _ref = series.obs.obsDimension.length - 1; 0 <= _ref ? _k <= _ref : _k >= _ref; i = 0 <= _ref ? ++_k : --_k) {
          for (j = _l = 0, _len2 = obsAttributes.length; _l < _len2; j = ++_l) {
            attr = obsAttributes[j];
            if (!(series.obs.attributes[attr] != null)) {
              continue;
            }
            if (series.obs.attributes[attr][i] == null) {
              continue;
            }
            value = series.obs.attributes[attr][i];
            if (obsAttributeValueCounts[attr][value] != null) {
              obsAttributeValueCounts[attr][value] += 1;
            } else {
              obsAttributeValueCounts[attr][value] = 1;
            }
          }
        }
      }
      obsAttributeDefaults = [];
      for (attr in obsAttributeValueCounts) {
        maxCount = 0;
        maxValue = null;
        _ref1 = obsAttributeValueCounts[attr];
        for (value in _ref1) {
          count = _ref1[value];
          if (maxCount < count) {
            maxValue = value;
            maxCount = count;
          }
        }
        obsAttributeDefaults[attr] = maxValue;
      }
      return obsAttributeDefaults;
    };

    calculateFrameOfReference = function(cache) {
      var i, max, min, series, _i, _j, _len, _ref;
      min = null;
      max = null;
      for (_i = 0, _len = cache.length; _i < _len; _i++) {
        series = cache[_i];
        for (i = _j = 0, _ref = series.obs.obsDimension.length - 1; 0 <= _ref ? _j <= _ref : _j >= _ref; i = 0 <= _ref ? ++_j : --_j) {
          if (!(series.obs.obsValue[i] != null)) {
            continue;
          }
          if (min != null) {
            if (series.obs.obsValue[i] < min) {
              min = series.obs.obsValue[i];
            }
          } else {
            min = series.obs.obsValue[i];
          }
          if (max != null) {
            if (max < series.obs.obsValue[i]) {
              max = series.obs.obsValue[i];
            }
          } else {
            max = series.obs.obsValue[i];
          }
        }
      }
      console.log(min);
      console.log(max);
      return min;
    };

    return WriteJsonProtoPipe;

  }