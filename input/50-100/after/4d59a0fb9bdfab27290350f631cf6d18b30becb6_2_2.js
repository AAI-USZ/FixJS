function(positions) {
      var pos, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = positions.length; _i < _len; _i++) {
        pos = positions[_i];
        _results.push(this.getLatLngFromArray(pos));
      }
      return _results;
    }