function() {
        var _i, _ref, _results;
        _results = [];
        for (_i = 0, _ref = this.squaresX; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--) {
          _results.push((function() {
            var _j, _ref1, _results1;
            _results1 = [];
            for (_j = 0, _ref1 = this.squaresY; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; 0 <= _ref1 ? _j++ : _j--) {
              _results1.push({});
            }
            return _results1;
          }).call(this));
        }
        return _results;
      }