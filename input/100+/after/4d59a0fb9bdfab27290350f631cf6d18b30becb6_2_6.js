function(coords) {
      var i, point, _len, _ref;
      if (!(coords[0] instanceof Array)) coords = [coords];
      this.guaranteePoints(coords.length);
      this.bounds = null;
      _ref = this.getPoints();
      for (i = 0, _len = _ref.length; i < _len; i++) {
        point = _ref[i];
        point.setPosition(this.getLatLngFromArray(coords[i]));
      }
      return MultiPoint.__super__.setCoordinates.call(this, coords);
    }