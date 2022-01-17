function(sdmxdata) {
      var key, series, value, _ref, _ref1, _ref2;
      this.log.debug("" + this.constructor.name + " convertSeries");
      series = sdmxdata.data;
      if (series.components != null) {
        _ref = series.components;
        for (key in _ref) {
          value = _ref[key];
          if (this.dsd.dimensionDescriptor[key] != null) {
            if ((_ref1 = series.seriesKey) == null) {
              series.seriesKey = {};
            }
            series.seriesKey[key] = value;
          } else if (this.dsd.attributeDescriptor[key] != null) {
            if ((_ref2 = series.attributes) == null) {
              series.attributes = {};
            }
            series.attributes[key] = value;
          }
        }
        delete series.components;
      }
      return sdmxdata;
    }