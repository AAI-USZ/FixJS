function(item_details) {
          var distance, drawable, drawableOptions, imgRes, location;
          location = new AR.GeoLocation(item_details.lat, item_details.long, _this.currentLocation.altitude);
          distance = _this.currentLocation.distanceTo(location);
          drawableOptions = {
            offsetY: (Math.random() * _this.OFFSET_Y_RANDOM_FACTOR) - _this.OFFSET_Y_RANDOM_FACTOR / 2,
            enabled: true
          };
          _this.geoObjects[item] = new AR.GeoObject(location, {
            enabled: false
          });
          imgRes = _this.createImageResource(item_details.thumb_link, _this.geoObjects[item]);
          drawable = _this.createImageDrawable(imgRes, drawableOptions);
          _this.setOpacityAndScaleOnDrawable(drawable, distance);
          return _this.geoObjects[item].drawables.addCamDrawable(drawable);
        }