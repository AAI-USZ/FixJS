function() {
        var _i, _ref2, _results;
        _results = [];
        for (piece = _i = 0, _ref2 = this.length - 1; 0 <= _ref2 ? _i <= _ref2 : _i >= _ref2; piece = 0 <= _ref2 ? ++_i : --_i) {
          _results.push(new Game.Pair(x, y - piece));
        }
        return _results;
      }