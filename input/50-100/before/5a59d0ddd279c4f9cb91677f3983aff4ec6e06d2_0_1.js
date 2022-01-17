function() {
              var _i, _len, _ref1, _results;
              _ref1 = ast.parameters;
              _results = [];
              for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                p = _ref1[_i];
                _results.push(generate(p, options));
              }
              return _results;
            }