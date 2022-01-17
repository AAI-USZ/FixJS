function(pos) {
      var type, _i, _len, _ref1, _results;
      _ref1 = this.squareTypes;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        type = _ref1[_i];
        _results.push(this.unregisterSquareAt(pos, type));
      }
      return _results;
    }