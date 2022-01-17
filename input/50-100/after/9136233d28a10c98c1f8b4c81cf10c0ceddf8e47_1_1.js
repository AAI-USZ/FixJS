function() {
      var pair, _i, _len, _ref;
      _ref = this.edgeWeights;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        pair = _ref[_i];
        if (pair.length !== 2) {
          return false;
        }
      }
      return true;
    }