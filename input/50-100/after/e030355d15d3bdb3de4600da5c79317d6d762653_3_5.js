function() {
            var _k, _len2, _results1;
            _results1 = [];
            for (_k = 0, _len2 = to_remove.length; _k < _len2; _k++) {
              i = to_remove[_k];
              _results1.push(this._listeners.splice(i, 1));
            }
            return _results1;
          }