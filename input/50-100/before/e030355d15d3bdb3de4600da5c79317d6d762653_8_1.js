function() {
        var _i, _len, _ref, _results;
        _ref = this.snapshot.data;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          elem = _ref[_i];
          if (typeof elem === 'string') _results.push(elem);
        }
        return _results;
      }