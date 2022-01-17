function(coords) {
      var path, paths, subCoords, _i, _len;
      paths = [];
      this.bounds = null;
      for (_i = 0, _len = coords.length; _i < _len; _i++) {
        subCoords = coords[_i];
        path = this.getLatLngArrayFromArray(subCoords);
        path.pop();
        paths.push(path);
      }
      return this.setPaths(paths);
    }