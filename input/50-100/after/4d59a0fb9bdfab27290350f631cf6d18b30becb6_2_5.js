function(map) {
      this.map = map;
      return this.overlay.setMap(this.map && this.map.googleMap ? this.map.googleMap : this.map);
    }