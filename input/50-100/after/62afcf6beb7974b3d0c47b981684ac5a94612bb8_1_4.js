function() {
      var arg, c_items;
      c_items = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = arguments.length; _i < _len; _i++) {
          arg = arguments[_i];
          _results.push(arg._compile());
        }
        return _results;
      }).apply(this, arguments);
      return "(" + (c_items.join(',\n')) + ")";
    }