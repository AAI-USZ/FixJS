function(coords) {
      this.bounds = null;
      this.overlay.setPosition(this.getLatLngFromArray(coords));
      return Point.__super__.setCoordinates.call(this, coords);
    }