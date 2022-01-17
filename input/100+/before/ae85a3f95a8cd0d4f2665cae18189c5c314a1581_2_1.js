function() {
    if (Drupal.settings.yamaps) {
      $.yaMaps.initLayouts();
      $.yaMaps.initPlugins();

      for (var mapId in Drupal.settings.yamaps) {
        var options = Drupal.settings.yamaps[mapId];
        if (!options.init.center || !options.init.zoom) {
          var location = ymaps.geolocation;
          if (!options.init.center) {
            options.init.center = [location.latitude, location.longitude];
          }
          if (!options.init.zoom) {
            options.init.zoom = location.zoom ? location.zoom : 10;
          }
        }
        var map = new $.yaMaps.YamapsMap(mapId, options);
        if (options.controls) {
          map.enableControls();
          map.enableTools();
        }
        if (options.traffic) {
          map.enableTraffic();
        }
      }
    }

  }