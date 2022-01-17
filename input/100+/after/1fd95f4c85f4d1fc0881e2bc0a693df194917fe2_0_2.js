function(siteId) {
      var _this = this;
      if (!this.geoObjects[siteId]) {
        return this.serverRequest("details_for_site_id/", [siteId], function(siteDetails) {
          var distance, drawable, drawableOptions, imgRes, location;
          location = new AR.GeoLocation(siteDetails.lat, siteDetails.long, _this.currentLocation.altitude);
          distance = _this.currentLocation.distanceTo(location);
          drawableOptions = {
            offsetY: (Math.random() * _this.OFFSET_Y_RANDOM_FACTOR) - _this.OFFSET_Y_RANDOM_FACTOR / 2,
            enabled: true
          };
          _this.geoObjects[siteId] = new AR.GeoObject(location, {
            enabled: false
          });
          imgRes = _this.createImageResource(siteDetails.images[0], _this.geoObjects[siteId]);
          drawable = _this.createImageDrawable(imgRes, drawableOptions);
          _this.setOpacityAndScaleOnDrawable(drawable, distance);
          return _this.geoObjects[siteId].drawables.addCamDrawable(drawable);
        });
      }
    }