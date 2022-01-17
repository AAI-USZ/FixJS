function(options) {
      var newPosition, point, position, _ref, _ref2;
      this.options = options != null ? options : {};
      if (((_ref = this.map) != null ? _ref.mode : void 0) !== komoo.Mode.NAVIGATE) {
        return;
      }
      this.setContent(options.content || (options.features ? this.createClusterContent(options) : this.createFeatureContent(options)));
      this.feature = options.feature || ((_ref2 = options.features) != null ? _ref2[0] : void 0);
      position = options.position || this.feature.getCenter();
      point = komoo.utils.latLngToPoint(this.map, position);
      point.x += 5;
      newPosition = komoo.utils.pointToLatLng(this.map, point);
      this.infoBox.setPosition(newPosition);
      return this.infoBox.open(this.map.googleMap || this.map);
    }