function() {
                var _k, _len2, _ref2, _results2;
                _ref2 = attribute.value.split('|');
                _results2 = [];
                for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
                  pipe = _ref2[_k];
                  _results2.push(pipe.trim());
                }
                return _results2;
              }