function(e) {
          if (e) {
            _this.MarkersConfig = _this.getConfigFromLocalStorage();
          } else {
            _this.MarkersConfig = Markers;
          }
          return callback();
        }