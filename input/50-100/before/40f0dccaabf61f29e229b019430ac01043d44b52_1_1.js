function(model, value) {
      var key, persp, _ref, _results;
      _ref = this.perspectives;
      _results = [];
      for (key in _ref) {
        persp = _ref[key];
        _results.push(persp.backgroundChanged(value));
      }
      return _results;
    }