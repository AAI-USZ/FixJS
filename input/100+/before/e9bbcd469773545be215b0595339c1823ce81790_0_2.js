function(listener) {
        var l;
        if (typeof listener === "string") {
          return listeners = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = listeners.length; _i < _len; _i++) {
              l = listeners[_i];
              if (l[1] !== listener) _results.push(l);
            }
            return _results;
          })();
        } else {
          return listeners = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = listeners.length; _i < _len; _i++) {
              l = listeners[_i];
              if (l[0] !== listener) _results.push(l);
            }
            return _results;
          })();
        }
      }