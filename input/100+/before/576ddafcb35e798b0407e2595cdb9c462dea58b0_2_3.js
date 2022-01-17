function() {
    return define([
      ['+', math_op('+', true)], ['-', math_op('-')], ['*', math_op('*')], ['/', math_op('/')], [
        'mod', function(a, b) {
          return a % b;
        }
      ], ['**', "Math.pow"], ['min', 'Math.min'], ['max', 'Math.max'], [
        'inc', function(x) {
          return ++x;
        }
      ], [
        'dec', function(x) {
          return --x;
        }
      ], ['<', compare_op('<')], ['>', compare_op('>')], ['<=', compare_op('<=')], ['>=', compare_op('>=')], [
        'eq', function() {
          var a, b, _i, _len;
          for (_i = 0, _len = arguments.length; _i < _len; _i++) {
            b = arguments[_i];
            if (!(typeof a !== "undefined" && a !== null)) {
              a = b;
              continue;
            }
            if (!__lodash__.isEqual(a, b)) {
              return false;
            }
            a = b;
          }
          return true;
        }
      ], ['=', 'eq'], [
        'not=', function() {
          return !(eq.apply(null, arguments));
        }
      ], ['or', binary_op('||')], ['and', binary_op('&&', true)], ['oppo-eval', 'oppo.eval'], ['__typeof__', 'lemur.core.to_type'], ['typeof', '__typeof__'], ['println', 'console.log.bind(console)'], ['prn', 'println'], ['__slice__', 'Array.prototype.slice'], [
        'first', function(a) {
          return a[0];
        }
      ], [
        'second', function(a) {
          return a[1];
        }
      ], [
        'last', function(a) {
          return a[a.length - 1];
        }
      ], [
        'init', function(a) {
          return a.slice(0, a.length - 1);
        }
      ], [
        'rest', function(a) {
          return a.slice(1);
        }
      ], [
        'nth', function(a, n) {
          if (n < 0) {
            n += a.length;
          } else if (n === 0) {
            console.warn("nth treats collections as 1-based instead of 0 based. Don't try to access the 0th element.");
            return null;
          } else {
            n -= 1;
          }
          return a[n];
        }
      ], ['push', push_unshift_op("push")], ['push-right', 'push'], ['push-r', 'push'], ['push-left', push_unshift_op("unshift")], ['push-l', (new C.Symbol('push-left')).compile()], ['pop', pop_shift_op("pop")], ['pop-right', 'pop'], ['pop-r', 'pop'], ['pop-left', pop_shift_op("shift")], ['pop-l', (new C.Symbol('pop-left')).compile()], [
        'concat', function (x) {
      var args = __slice__.call(arguments, 1);
      return x.concat.apply(x, args);
    }
      ], [
        'sort', function(a, f) {
          var new_a;
          new_a = a.slice();
          if (f != null) {
            return new_a.sort(f);
          } else {
            return new_a.sort();
          }
        }
      ], [
        'map', function(f, o) {
          var k, result, t, v, x, _i, _len, _results;
          t = __typeof__(o);
          if (o.map != null) {
            return o.map(function(x) {
              return f(x);
            });
          } else if (t === "array" || o instanceof Array) {
            _results = [];
            for (_i = 0, _len = o.length; _i < _len; _i++) {
              x = o[_i];
              _results.push(f(x));
            }
            return _results;
          } else if (t === "object" || o instanceof Object) {
            result = {};
            for (k in o) {
              v = o[k];
              if (!o.hasOwnProperty(k)) {
                continue;
              }
              result[k] = f([k, v]);
            }
            return result;
          }
        }
      ], [
        'reduce', function(f, o) {
          var k, result, t, v, x, _i, _len;
          t = __typeof__(o);
          if (o.reduce != null) {
            return o.reduce(function(a, b) {
              return f(a, b);
            });
          } else if (t === "array" || o instanceof Array) {
            for (_i = 0, _len = o.length; _i < _len; _i++) {
              x = o[_i];
              if (!(typeof result !== "undefined" && result !== null)) {
                result = x;
                continue;
              }
              result = f(result, x);
            }
          } else if (t === "object" || o instanceof Object) {
            for (k in o) {
              v = o[k];
              if (!o.hasOwnProperty(k)) {
                continue;
              }
              if (!(result != null)) {
                result = v;
                continue;
              }
              result = f(result, v);
            }
          }
          return result;
        }
      ], [
        'reduce-right', function(f, o) {
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
      ], ['reduce-r', (new C.Symbol('reduce-right')).compile()], [
        'filter', function(f, o) {
          var k, result, t, v, x, _i, _len;
          t = __typeof__(o);
          if (o.filter != null) {
            return o.filter(function(x) {
              return f(x);
            });
          } else if (t === "array" || o instanceof Array) {
            result = [];
            for (_i = 0, _len = o.length; _i < _len; _i++) {
              x = o[_i];
              if (f(x)) {
                result.push(x);
              }
            }
          } else if (t === "object" || o instanceof Object) {
            result = {};
            for (k in o) {
              v = o[k];
              if (!o.hasOwnProperty(k)) {
                continue;
              }
              if (f([k, v])) {
                result[k] = v;
              }
            }
          }
          return result;
        }
      ], [
        'keys', "Object.keys || " + function(o) {
          var k, _results;
          _results = [];
          for (k in o) {
            if (!o.hasOwnProperty(k)) {
              continue;
            }
            _results.push(k);
          }
          return _results;
        }
      ], [
        'values', function(o) {
          var k, t, _i, _len, _ref3, _results;
          t = __typeof__(o);
          if (t === "array" || o instanceof Array) {
            return o.slice();
          } else if (t === "object" || o instanceof Object) {
            _ref3 = keys(o);
            _results = [];
            for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
              k = _ref3[_i];
              _results.push(o[k]);
            }
            return _results;
          }
        }
      ], [
        'str', function() {
          var arg, args;
          args = (function() {
            var _i, _len, _results;
            _results = [];
            for (_i = 0, _len = arguments.length; _i < _len; _i++) {
              arg = arguments[_i];
              if (typeof arg === "string") {
                _results.push(arg);
              } else if (arg.toString != null) {
                _results.push(arg.toString());
              } else {
                _results.push("" + arg);
              }
            }
            return _results;
          }).apply(this, arguments);
          return args.join('');
        }
      ], [
        'uppercase', function(s) {
          return s.toUpperCase();
        }
      ], [
        'lowercase', function(s) {
          return s.toLowerCase();
        }
      ], [
        'replace', function(s, re, rplc) {
          return s.replace(re, rplc);
        }
      ], [
        'match', function(s, re) {
          return s.match(re);
        }
      ], [
        're-test', function(re, s) {
          return re.test(s);
        }
      ]
    ]);
  }