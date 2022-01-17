function(e) {
          var loadedConfig;
          if (e) {
            loadedConfig = _this.getConfigFromLocalStorage();
            _this.MarkersConfig = loadedConfig.markers;
          } else {
            _this.MarkersConfig = Markers;
          }
          return callback();
        }