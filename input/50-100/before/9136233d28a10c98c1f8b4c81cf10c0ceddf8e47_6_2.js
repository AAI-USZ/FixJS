function(grid) {
      var pair, _i, _len, _ref1;
      this.grid = grid;
      _ref1 = this.chain;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        pair = _ref1[_i];
        this.grid.registerSquareAt(pair, 'snake');
      }
      return this.moves.enqueue(this._nextPosition());
    }