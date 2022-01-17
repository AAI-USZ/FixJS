function() {
      var i, k, kset, removed, _i, _j, _len, _ref;
      kset = {
        '1': enumKeys(4),
        '2': enumKeys(3)
      };
      for (i = _i = 1; _i <= 2; i = ++_i) {
        removed = 0;
        _ref = this.keys[i].slice(0).sort();
        for (_j = 0, _len = _ref.length; _j < _len; _j++) {
          k = _ref[_j];
          kset[i].splice(Number(k) - removed++, 1);
        }
      }
      return this.keys[1].concat(kset[1], this.keys[2], kset[2]);
    }