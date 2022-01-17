function(data) {
      var dim, i, index, key, obsDimension, series, status, value, _i, _j, _len, _len1, _ref;
      status = [];
      for (i = _i = 0, _len = data.length; _i < _len; i = ++_i) {
        value = data[i];
        data[i] = value === '.' ? NaN : value;
        status.push(value === '.' ? 'M' : 'A');
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
      obsDimension = this.dimensions[this.dimensions.length - 1].codelist.codes;
      series = {
        seriesKey: key,
        attributes: {},
        obs: {
          obsDimension: obsDimension,
          obsValue: data,
          attributes: {
            OBS_STATUS: status
          }
        }
      };
      this.dataCount += 1;
      return this.emitSDMX(sdmx.SERIES, series);
    }