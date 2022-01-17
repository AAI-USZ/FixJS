function() {
        var _i, _ref1, _results;
        _results = [];
        for (_i = 0, _ref1 = this.squaresX; 0 <= _ref1 ? _i < _ref1 : _i > _ref1; 0 <= _ref1 ? _i++ : _i--) {
          _results.push((function() {
            var _j, _ref2, _results1;
            _results1 = [];
            for (_j = 0, _ref2 = this.squaresY; 0 <= _ref2 ? _j < _ref2 : _j > _ref2; 0 <= _ref2 ? _j++ : _j--) {
              _results1.push({});
            }
            return _results1;
          }).call(this));
        }
        return _results;
      }