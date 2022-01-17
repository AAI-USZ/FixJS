function(min, max) {
        return _.each(this.get('series').rows, function(row) {
          var i, value, _i, _ref, _results;
          _results = [];
          for (i = _i = 1, _ref = row.length - 1; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
            value = row[i];
            if (value == null) value = 0;
            _results.push(row[i] = this.cutoffValue(value, min, max));
          }
          return _results;
        }, this);
      }