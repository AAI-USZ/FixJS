function(p) {
          // TODO: easing
          if (this.options.snapToZoom) {
              var z = this.mapModel.getZoom(), // current zoom
              tz = Math.round(z);     // target zoom
              this.mapModel.zoomBy(tz - z);
          }
          this.wasPinching = false;
      }