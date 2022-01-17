function(coords) {
      var pos;
      return this.overlay.setPath((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = coords.length; _i < _len; _i++) {
          pos = coords[_i];
          _results.push(this.getLatLngFromArray(pos));
        }
        return _results;
      }).call(this));
    }