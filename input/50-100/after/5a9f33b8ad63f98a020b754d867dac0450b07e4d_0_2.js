function() {
      var tv, _i, _len, _ref;
      _ref = this.termDocs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tv = _ref[_i];
        tv.masks.set(this.currentDocNum, tv.masks.get(this.currentDocNum));
      }
    }