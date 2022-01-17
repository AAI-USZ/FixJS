function() {
      var i, k, kset, removed, _i, _len, _ref;
      kset = {
        '1': enumKeys(4),
        '2': enumKeys(3)
      };
      for (i = 1; i <= 2; i++) {
        removed = 0;
        _ref = this.keys[i].slice(0).sort();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          k = _ref[_i];
          kset[i].splice(Number(k) - removed++, 1);
        }
      }
      return this.keys[1].concat(kset[1], this.keys[2], kset[2]);
    }