function(data) {
      var dim, i, index, key, obsDimension, obsDimensionCodes, obsStatus, obsValue, series, value, _i, _j, _len, _len1, _ref;
      obsDimensionCodes = this.dimensions[this.dimensions.length - 1].codelist.codes;
      obsDimension = [];
      obsValue = [];
      obsStatus = [];
      for (i = _i = 0, _len = data.length; _i < _len; i = ++_i) {
        value = data[i];
        if (value === '.') {
          continue;
        }
        obsDimension.push(obsDimensionCodes[i]);
        obsValue.push(value === '..' || value === '...' ? NaN : value);
        obsStatus.push(value === '..' || value === '...' ? 'M' : 'A');
      }
      key = {};
      _ref = this.dimensions;
      for (i = _j = 0, _len1 = _ref.length; _j < _len1; i = ++_j) {
        dim = _ref[i];
        if (!(i < this.dimensions.length - 1)) {
          continue;
        }
        index = Math.floor(this.dataCount / dim.step) % dim.codelist.codes.length;
        key[dim.concept.id] = dim.codelist.codes[index];
      }
      series = {
        seriesKey: key,
        attributes: {},
        obs: {
          obsDimension: obsDimension,
          obsValue: obsValue,
          attributes: {
            OBS_STATUS: obsStatus
          }
        }
      };
      this.dataCount += 1;
      return this.emitSDMX(sdmx.SERIES, series);
    }