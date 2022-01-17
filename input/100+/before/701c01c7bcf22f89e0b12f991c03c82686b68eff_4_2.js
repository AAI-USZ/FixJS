function() {
      var coords, path, subCoords, _i, _len, _ref;
      coords = [];
      _ref = this.overlay.getPaths().getArray();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        path = _ref[_i];
        subCoords = this.getArrayFromLatLngArray(path.getArray());
        if (subCoords.length) subCoords.push(subCoords[0]);
        if (subCoords.length > 0) coords.push(subCoords);
      }
      return coords;
    }