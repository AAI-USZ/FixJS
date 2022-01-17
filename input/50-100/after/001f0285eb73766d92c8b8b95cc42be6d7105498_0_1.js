function(map, force) {
      var _this = this;
      this.map = map;
      this.forEach(function(feature) {
        return feature.setMap(_this.map, force);
      });
      return this.handleMapEvents();
    }