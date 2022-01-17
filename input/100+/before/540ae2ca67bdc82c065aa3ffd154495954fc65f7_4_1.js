function(key) {
        var _ref;
        if ((_ref = key.length) === 7 || _ref === 8) {
          _this.keys[1].push(key.slice(0, 4));
          _this.keys[2].push(key.slice(4, 7));
        }
        if (key.length === 4) _this.keys[1].push(key);
        if (key.length === 3) return _this.keys[2].push(key);
      }