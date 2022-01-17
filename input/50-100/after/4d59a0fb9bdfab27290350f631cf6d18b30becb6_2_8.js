function() {
      var latLng, _i, _len, _ref, _results;
      _ref = this.overlay.getPath().getArray();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        latLng = _ref[_i];
        _results.push(this.getArrayFromLatLng(latLng));
      }
      return _results;
    }