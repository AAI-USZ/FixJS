function() {
              var _j, _len1, _ref1, _results;
              _results = [];
              for (_j = 0, _len1 = chain.length; _j < _len1; _j++) {
                _ref1 = chain[_j], filename = _ref1.filename, js = _ref1.js;
                filename = stripExt(filename) + '.js';
                this.cache.set(filename, js);
                _results.push("/" + filename);
              }
              return _results;
            }