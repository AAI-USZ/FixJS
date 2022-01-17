function(map, opt_force) {
      this.map = map;
      this.forEach(function(feature) {
        return feature.setMap(this.map, opt_force);
      });
      return this.handleMapEvents();
    }