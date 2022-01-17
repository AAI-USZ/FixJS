function(op) {
        var c, dummy, i, l, to_remove, xformed, _i, _len, _len2, _ref, _results;
        _results = [];
        for (_i = 0, _len = op.length; _i < _len; _i++) {
          c = op[_i];
          if (c.na !== void 0 || c.si !== void 0 || c.sd !== void 0) continue;
          to_remove = [];
          _ref = this._listeners;
          for (i = 0, _len2 = _ref.length; i < _len2; i++) {
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
            var _j, _len3, _results2;
            _results2 = [];
            for (_j = 0, _len3 = to_remove.length; _j < _len3; _j++) {
              i = to_remove[_j];
              _results2.push(this._listeners.splice(i, 1));
            }
            return _results2;
          }).call(this));
        }
        return _results;
      }