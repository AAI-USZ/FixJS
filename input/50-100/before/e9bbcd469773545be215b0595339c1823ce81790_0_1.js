function() {
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
        }