function(f, o) {
          var result, t, x, _i, _len, _ref3;
          t = __typeof__(o);
          if (o.reduceRight != null) {
            return o.reduceRight(function(a, b) {
              return f(a, b);
            });
          } else if (t === "array" || o instanceof Array) {
            _ref3 = o.slice().reverse();
            for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
              x = _ref3[_i];
              if (!(typeof result !== "undefined" && result !== null)) {
                result = x;
                continue;
              }
              result = f(result, x);
            }
            return result;
          } else if (t === "object" || o instanceof Object) {
            return reduce(f, o);
          }
        }