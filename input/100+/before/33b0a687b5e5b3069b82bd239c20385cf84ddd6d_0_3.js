function(e) {
          // use the first two touches and their previous positions
          var t0 = e.touches[0],
          t1 = e.touches[1],
          p0 = new MM.Point(t0.clientX, t0.clientY),
          p1 = new MM.Point(t1.clientX, t1.clientY),
          l0 = this.locations[t0.identifier],
          l1 = this.locations[t1.identifier];

          // mark these touches so they aren't used as taps/holds
          l0.wasPinch = true;
          l1.wasPinch = true;

          // scale about the center of these touches
          var center = MM.Point.interpolate(p0, p1, 0.5);

          this.map.zoomBy(
              Math.log(e.scale) / Math.LN2 -
                  Math.log(l0.scale) / Math.LN2);

          // pan from the previous center of these touches
          var prevCenter = MM.Point.interpolate(l0, l1, 0.5);

          this.wasPinching = true;
          this.lastPinchCenter = center;
      }