function() {
            var _j, _len3, _results2;
            _results2 = [];
            for (_j = 0, _len3 = to_remove.length; _j < _len3; _j++) {
              i = to_remove[_j];
              _results2.push(this._listeners.splice(i, 1));
            }
            return _results2;
          }