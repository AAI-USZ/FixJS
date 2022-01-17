function(callback) {
      var column, pos, square, x, y, _i, _len, _ref1, _results;
      if (!this.world) {
        return;
      }
      _ref1 = this.world;
      _results = [];
      for (x = _i = 0, _len = _ref1.length; _i < _len; x = ++_i) {
        column = _ref1[x];
        _results.push((function() {
          var _j, _len1, _results1;
          _results1 = [];
          for (y = _j = 0, _len1 = column.length; _j < _len1; y = ++_j) {
            square = column[y];
            pos = new Game.Pair(x, y);
            _results1.push(callback(pos, square));
          }
          return _results1;
        })());
      }
      return _results;
    }