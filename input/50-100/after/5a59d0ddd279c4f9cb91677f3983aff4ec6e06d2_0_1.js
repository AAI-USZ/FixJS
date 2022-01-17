function() {
              var _i, _len, _ref2, _results;
              _ref2 = ast.parameters;
              _results = [];
              for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
                p = _ref2[_i];
                _results.push(generate(p, options));
              }
              return _results;
            }