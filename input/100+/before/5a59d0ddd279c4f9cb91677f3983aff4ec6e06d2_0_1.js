function() {
              var _i, _len, _ref1, _results;
              _ref1 = ast.statements;
              _results = [];
              for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
                s = _ref1[_i];
                _results.push(generate(s, options));
              }
              return _results;
            }