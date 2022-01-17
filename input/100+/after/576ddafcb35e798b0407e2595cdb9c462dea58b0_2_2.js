function() {
          var a, b, _i, _len;
          for (_i = 0, _len = arguments.length; _i < _len; _i++) {
            b = arguments[_i];
            if (!(typeof a !== "undefined" && a !== null)) {
              a = b;
              continue;
            }
            if (!__equal__(a, b)) {
              return false;
            }
            a = b;
          }
          return true;
        }