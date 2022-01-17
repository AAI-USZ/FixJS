function(callback) {
      var column, pos, square, x, y, _len, _ref, _results;
      if (!this.world) return;
      _ref = this.world;
      _results = [];
      for (x = 0, _len = _ref.length; x < _len; x++) {
        column = _ref[x];
        _results.push((function() {
          var _len2, _results2;
          _results2 = [];
          for (y = 0, _len2 = column.length; y < _len2; y++) {
            square = column[y];
            pos = new Game.Pair(x, y);
            _results2.push(callback(pos, square));
          }
          return _results2;
        })());
      }
      return _results;
    }