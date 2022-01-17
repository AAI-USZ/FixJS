function() {
                var _j, _len1, _results1;
                _results1 = [];
                for (_j = 0, _len1 = exprs.length; _j < _len1; _j++) {
                  e = exprs[_j];
                  _results1.push(e.toJSON());
                }
                return _results1;
              }