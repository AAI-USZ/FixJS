function(attrs) {
      var key, value, _base, _base1, _base2, _base3, _results;
      if (seriesCur.obs == null) {
        seriesCur.obs = {};
      }
      if ((_base = seriesCur.obs).obsDimension == null) {
        _base.obsDimension = [];
      }
      if ((_base1 = seriesCur.obs).obsValue == null) {
        _base1.obsValue = [];
      }
      if ((_base2 = seriesCur.obs).attributes == null) {
        _base2.attributes = {};
      }
      _results = [];
      for (key in attrs) {
        value = attrs[key];
        switch (key) {
          case 'TIME_PERIOD':
            _results.push(seriesCur.obs.obsDimension.push(value));
            break;
          case 'OBS_VALUE':
            _results.push(seriesCur.obs.obsValue.push(Number(value)));
            break;
          default:
            if ((_base3 = seriesCur.obs.attributes)[key] == null) {
              _base3[key] = [];
            }
            _results.push(seriesCur.obs.attributes[key].push(value));
        }
      }
      return _results;
    }