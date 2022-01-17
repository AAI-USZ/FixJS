function() {
      var chunk, i, tab, _i, _len, _ref, _results;
      tab = this._tabAsSpaces();
      _ref = this.codeObj;
      _results = [];
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        chunk = _ref[i];
        if (chunk[0] === 'COFFEE') {
          _results.push(chunk[1] = chunk[1].replace(/\t/g, tab));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }