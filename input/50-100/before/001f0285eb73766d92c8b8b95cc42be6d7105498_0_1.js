function(map, opt_force) {
      var _this = this;
      this.map = map;
      this.forEach(function(feature) {
        return feature.setMap(_this.map, opt_force);
      });
      return this.handleMapEvents();
    }