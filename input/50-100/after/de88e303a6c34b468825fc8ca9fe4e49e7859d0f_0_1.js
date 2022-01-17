function() {
                var _j, _len1, _results1;
                _results1 = [];
                for (_j = 0, _len1 = conds.length; _j < _len1; _j++) {
                  c = conds[_j];
                  _results1.push(c.toJSON());
                }
                return _results1;
              }