function() {
              var _i, _len, _ref2, _results;
              _ref2 = ast["arguments"];
              _results = [];
              for (i = _i = 0, _len = _ref2.length; _i < _len; i = ++_i) {
                a = _ref2[i];
                arg = generate(a, options);
                if ((needsParensWhenOnLeft(a)) && i + 1 !== ast["arguments"].length) {
                  arg = "(" + arg + ")";
                }
                _results.push(arg);
              }
              return _results;
            }