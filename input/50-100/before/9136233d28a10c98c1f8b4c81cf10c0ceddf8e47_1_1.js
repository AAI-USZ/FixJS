function() {
      var pair, _i, _len, _ref1;
      _ref1 = this.edgeWeights;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        pair = _ref1[_i];
        if (pair.length !== 2) {
          return false;
        }
      }
      return true;
    }