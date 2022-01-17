function() {
              var _j, _len2, _ref2, _results;
              _results = [];
              for (_j = 0, _len2 = chain.length; _j < _len2; _j++) {
                _ref2 = chain[_j], filename = _ref2.filename, js = _ref2.js;
                filename = stripExt(filename) + '.js';
                this.cache.set(filename, js);
                _results.push("/" + filename);
              }
              return _results;
            }