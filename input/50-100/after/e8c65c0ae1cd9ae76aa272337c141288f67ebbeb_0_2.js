function(square) {
      var type, _i, _len, _ref1;
      _ref1 = this.squareTypes;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        type = _ref1[_i];
        if (square[type]) {
          return false;
        }
      }
      return true;
    }