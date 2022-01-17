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
      ], ['<', compare_op('<')], ['>', compare_op('>')], ['<=', compare_op('<=')], ['>=', compare_op('>=')], ['__hasDontEnumBug__', "!propertyIsEnumerable.call({ 'valueOf': 0 }, 'valueOf')"], ['__explicitEnum__', "__hasDontEnumBug__ ? [        'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',        'toLocaleString', 'toString', 'valueOf'      ] : null"], ['__hasOwnProperty__', 'Object.prototype.hasOwnProperty'], [
        '__equal__', function (a, b, stack) {
        stack || (stack = []);

        // exit early for identical values
        if (a === b) {
          // treat '+0' vs. '-0' as not equal
          return a !== 0 || (1 / a == 1 / b);
        }
        // a strict comparison is necessary because 'undefined == null'
        if (a == null || b == null) {
          return a === b;
        }
        // compare [[Class]] names
        var className = __typeof__(a);
        if (className != __typeof__(b)) {
          return false;
        }
        switch (className) {
          // strings, numbers, dates, and booleans are compared by value
          case "string":
            // primitives and their corresponding object instances are equivalent;
            // thus, '5' is quivalent to 'new String('5')'
            return a == String(b);

          case "number":
            // treat 'NaN' vs. 'NaN' as equal
            return a != +a
              ? b != +b
              // but treat '+0' vs. '-0' as not equal
              : (a == 0 ? (1 / a == 1 / b) : a == +b);

          case "boolean":
          case "date":
            // coerce dates and booleans to numeric values, dates to milliseconds and
            // booleans to 1 or 0; treat invalid dates coerced to 'NaN' as not equal
            return +a == +b;

          // regexps are compared by their source and flags
          case "regexp":
            return a.source == b.source &&
                   a.global == b.global &&
                   a.multiline == b.multiline &&
                   a.ignoreCase == b.ignoreCase;
        }
        if (typeof a != 'object' || typeof b != 'object') {
          return false;
        }
        // Assume equality for cyclic structures. The algorithm for detecting cyclic
        // structures is adapted from ES 5.1 section 15.12.3, abstract operation 'JO'.
        var length = stack.length;
        while (length--) {
          // Linear search. Performance is inversely proportional to the number of
          // unique nested structures.
          if (stack[length] == a) {
            return true;
          }
        }

        var index = -1,
            result = true,
            size = 0;

        // add the first collection to the stack of traversed objects
        stack.push(a);

        // recursively compare objects and arrays
        if (className == "array") {
          // compare array lengths to determine if a deep comparison is necessary
          size = a.length;
          result = size == b.length;

          if (result) {
            // deep compare the contents, ignoring non-numeric properties
            while (size--) {
              if (!(result = __equal__(a[size], b[size], stack))) {
                break;
              }
            }
          }
        }
        else {
          // objects with different constructors are not equivalent
          if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) {
            return false;
          }
          // deep compare objects.
          for (var prop in a) {
            if (__hasOwnProperty__.call(a, prop)) {
              // count the number of properties.
              size++;
              // deep compare each property value.
              if (!(result = __hasOwnProperty__.call(b, prop) && __equal__(a[prop], b[prop], stack))) {
                break;
              }
            }
          }
          // ensure both objects have the same number of properties
          if (result) {
            for (prop in b) {
              // Adobe's JS engine, embedded in applications like InDesign, has a
              // bug that causes '!size--' to throw an error so it must be wrapped
              // in parentheses.
              // https://github.com/documentcloud/underscore/issues/355
              if (__hasOwnProperty__.call(b, prop) && !(size--)) {
                break;
              }
            }
            result = !size;
          }
          // handle JScript [[DontEnum]] bug
          if (result && __hasDontEnumBug__) {
            while (++index < 7) {
              prop = __explicitEnum__[index];
              if (__hasOwnProperty__.call(a, prop)) {
                if (!(result = __hasOwnProperty__.call(b, prop) && __equal__(a[prop], b[prop], stack))) {
                  break;
                }
              }
            }
          }
        }
        // remove the first collection from the stack of traversed objects
        stack.pop();
        return result;
      }
      ], [
        '=', function() {
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
      ], [
        'not=', function() {
          return !(eq.apply(null, arguments));
        }
      ], ['or', binary_op('||')], ['and', binary_op('&&', true)], ['__oppo_eval__', 'oppo.eval'], ['__typeof__', 'lemur.core.to_type'], ['typeof', '__typeof__'], ['println', 'console.log.bind(console)'], ['prn', 'println'], ['__slice__', 'Array.prototype.slice'], [
        'list', function() {
          return __slice__.call(arguments);
        }
      ], [
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