function(pos) {
      var type, _i, _len, _ref, _results;
      _ref = this.squareTypes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        type = _ref[_i];
        _results.push(this.unregisterSquareAt(pos, type));
      }
      return _results;
    }