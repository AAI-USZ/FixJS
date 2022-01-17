function(p) {
          // TODO: easing
          if (this.options.snapToZoom) {
              var z = this.map.getZoom(), // current zoom
              tz = Math.round(z);     // target zoom
              this.map.zoomBy(tz - z);
          }
          this.wasPinching = false;
      }