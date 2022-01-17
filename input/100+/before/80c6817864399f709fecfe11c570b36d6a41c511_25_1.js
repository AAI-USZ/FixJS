function(_super) {

    __extends(CompactSeriesPipe, _super);

    CompactSeriesPipe.name = 'CompactSeriesPipe';

    function CompactSeriesPipe(log) {
      this.log = log;
      CompactSeriesPipe.__super__.constructor.apply(this, arguments);
    }

    CompactSeriesPipe.prototype.processData = function(data) {
      var first, i, key, last, obs, series, value, _i, _len, _ref, _ref1;
      if (data.type === sdmx.SERIES) {
        series = data.data;
        first = last = -1;
        _ref = series.obs.obsValue;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          obs = _ref[i];
          if (obs / obs === 1) {
            if (first === -1) {
              first = last = i;
            }
            if (last < i) {
              last = i;
            }
          }
        }
        if (first === -1) {
          return;
        }
        if (0 < first || last < series.obs.obsValue.length - 1) {
          series.obs.obsValue = series.obs.obsValue.slice(first, last + 1 || 9e9);
          series.obs.obsDimension = series.obs.obsDimension.slice(first, last + 1 || 9e9);
          _ref1 = series.obs.attributes;
          for (key in _ref1) {
            value = _ref1[key];
            series.obs.attributes[key] = value.slice(first, last + 1 || 9e9);
          }
        }
        return CompactSeriesPipe.__super__.processData.apply(this, arguments);
      } else {
        return CompactSeriesPipe.__super__.processData.apply(this, arguments);
      }
    };

    return CompactSeriesPipe;

  }