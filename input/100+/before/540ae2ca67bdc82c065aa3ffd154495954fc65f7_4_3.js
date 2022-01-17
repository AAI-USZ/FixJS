function(set, kindex, pad) {
      var k, key, keys, _i, _len, _ref;
      if (pad == null) pad = true;
      keys = this.keys[set];
      if (kindex >= keys.length) {
        key = kindex - keys.length;
        for (_i = 0, _len = keys.length; _i < _len; _i++) {
          k = keys[_i];
          if (Number(k) < (kindex - 1)) key++;
        }
      } else {
        key = (_ref = keys[kindex]) != null ? _ref : '0000';
      }
      if (pad) {
        return padKey(key, 5 - set);
      } else {
        return key;
      }
    }