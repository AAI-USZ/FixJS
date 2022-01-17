function() {
      var point, _i, _len, _ref, _results;
      _ref = this.getPoints();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        point = _ref[_i];
        _results.push(point.getPosition());
      }
      return _results;
    }