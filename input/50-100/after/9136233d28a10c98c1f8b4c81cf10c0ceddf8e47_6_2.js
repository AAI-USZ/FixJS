function(grid) {
      var pair, _i, _len, _ref, _results;
      this.grid = grid;
      _ref = this.chain;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        pair = _ref[_i];
        _results.push(this.grid.registerSquareAt(pair, 'snake'));
      }
      return _results;
    }