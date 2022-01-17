function(attrs) {
      var key, value, _base, _results;
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
            if ((_base = seriesCur.obs.attributes)[key] == null) {
              _base[key] = [];
            }
            _results.push(seriesCur.obs.attributes[key].push(value));
        }
      }
      return _results;
    }