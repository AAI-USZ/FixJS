function(op) {
        var c, dummy, i, l, to_remove, xformed, _i, _j, _len, _len1, _ref, _results;
        _results = [];
        for (_i = 0, _len = op.length; _i < _len; _i++) {
          c = op[_i];
          if (c.na !== void 0 || c.si !== void 0 || c.sd !== void 0) {
            continue;
          }
          to_remove = [];
          _ref = this._listeners;
          for (i = _j = 0, _len1 = _ref.length; _j < _len1; i = ++_j) {
            l = _ref[i];
            dummy = {
              p: l.path,
              na: 0
            };
            xformed = this.type.transformComponent([], dummy, c, 'left');
            if (xformed.length === 0) {
              to_remove.push(i);
            } else if (xformed.length === 1) {
              l.path = xformed[0].p;
            } else {
              throw new Error("Bad assumption in json-api: xforming an 'si' op will always result in 0 or 1 components.");
            }
          }
          to_remove.sort(function(a, b) {
            return b - a;
          });
          _results.push((function() {
            var _k, _len2, _results1;
            _results1 = [];
            for (_k = 0, _len2 = to_remove.length; _k < _len2; _k++) {
              i = to_remove[_k];
              _results1.push(this._listeners.splice(i, 1));
            }
            return _results1;
          }).call(this));
        }
        return _results;
      }