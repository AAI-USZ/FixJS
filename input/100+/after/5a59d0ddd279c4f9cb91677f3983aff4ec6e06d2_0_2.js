function() {
              var _i, _len, _ref5, _results;
              _ref5 = ast["arguments"];
              _results = [];
              for (i = _i = 0, _len = _ref5.length; _i < _len; i = ++_i) {
                a = _ref5[i];
                arg = generate(a, options);
                if ((needsParensWhenOnLeft(a)) && i + 1 !== ast["arguments"].length) {
                  arg = "(" + arg + ")";
                }
                _results.push(arg);
              }
              return _results;
            }