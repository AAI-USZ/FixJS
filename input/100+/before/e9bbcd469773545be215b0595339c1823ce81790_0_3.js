function() {
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
        }