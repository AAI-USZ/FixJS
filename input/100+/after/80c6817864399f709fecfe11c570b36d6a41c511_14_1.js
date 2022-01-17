function() {
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
    }