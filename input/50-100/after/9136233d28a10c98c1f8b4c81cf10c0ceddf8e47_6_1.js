function() {
        var _i, _ref1, _results;
        _results = [];
        for (piece = _i = 0, _ref1 = this.length - 1; 0 <= _ref1 ? _i <= _ref1 : _i >= _ref1; piece = 0 <= _ref1 ? ++_i : --_i) {
          _results.push(new Game.Pair(x, y - piece));
        }
        return _results;
      }