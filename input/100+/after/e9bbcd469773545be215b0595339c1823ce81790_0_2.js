function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = callbackFns.length; _i < _len; _i++) {
              fn = callbackFns[_i];
              if (fn !== listener) _results.push(fn);
            }
            return _results;
          }