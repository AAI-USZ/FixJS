function(square) {
      var type, _i, _len, _ref;
      _ref = this.squareTypes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        type = _ref[_i];
        if (square[type]) {
          return false;
        }
      }
      return true;
    }