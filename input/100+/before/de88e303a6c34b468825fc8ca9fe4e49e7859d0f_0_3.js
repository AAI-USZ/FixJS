function() {
          var _i, _len, _ref2, _ref3, _results;
          _ref2 = this.cases;
          _results = [];
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            _ref3 = _ref2[_i], exprs = _ref3[0], block = _ref3[1];
            _results.push([
              (function() {
                var _j, _len1, _results1;
                _results1 = [];
                for (_j = 0, _len1 = exprs.length; _j < _len1; _j++) {
                  e = exprs[_j];
                  _results1.push(e.toJSON());
                }
                return _results1;
              })(), block.toJSON()
            ]);
          }
          return _results;
        }