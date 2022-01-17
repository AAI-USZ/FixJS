function(isPreventable, isUnicast) {
      var listeners, that;
      that = {};
      that.isPreventable = isPreventable;
      that.isUnicast = isUnicast;
      listeners = [];
      that.addListener = function(listener, namespace) {
        return listeners.push([listener, namespace]);
      };
      that.removeListener = function(listener) {
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
      };
      if (isUnicast) {
        that.fire = function() {
          var args, _ref3;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (listeners.length > 0) {
            try {
              return (_ref3 = listeners[0])[0].apply(_ref3, args);
            } catch (e) {
              return console.log(e);
            }
          } else {
            return true;
          }
        };
      } else if (isPreventable) {
        that.fire = function() {
          var args, l, listener, r, _i, _len;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          r = true;
          for (_i = 0, _len = listeners.length; _i < _len; _i++) {
            listener = listeners[_i];
            l = listener[0];
            try {
              r = l.apply(null, args);
            } catch (e) {
              console.log(e);
            }
            if (r === false) return false;
          }
          return true;
        };
      } else {
        that.fire = function() {
          var args, listener, _i, _len;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          for (_i = 0, _len = listeners.length; _i < _len; _i++) {
            listener = listeners[_i];
            try {
              listener[0].apply(listener, args);
            } catch (e) {
              console.log(listener[0], args, e);
            }
          }
          return true;
        };
      }
      return that;
    }