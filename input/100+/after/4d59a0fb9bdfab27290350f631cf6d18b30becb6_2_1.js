function() {
      var bounds, coordinates, e, geometryType, getBounds, n, path, position, s, w, _i, _j, _len, _len2;
      n = s = w = e = null;
      getBounds = function(pos) {
        if (n == null) n = (s != null ? s : s = pos[0]);
        if (w == null) w = (e != null ? e : e = pos[1]);
        n = Math.max(pos[0], n);
        s = Math.min(pos[0], s);
        w = Math.min(pos[1], w);
        e = Math.max(pos[1], e);
        return [[s, w], [n, e]];
      };
      coordinates = this.getCoordinates();
      geometryType = this.getGeometryType();
      if (geometryType !== POLYGON && geometryType !== MULTIPOLYLINE) {
        coordinates = [coordinates];
      }
      for (_i = 0, _len = coordinates.length; _i < _len; _i++) {
        path = coordinates[_i];
        for (_j = 0, _len2 = path.length; _j < _len2; _j++) {
          position = path[_j];
          bounds = getBounds(position);
        }
      }
      if (bounds != null) {
        this.bounds = new google.maps.LatLngBounds(this.getLatLngFromArray(bounds[0]), this.getLatLngFromArray(bounds[1]));
      }
      return this.bounds;
    }