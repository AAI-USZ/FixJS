function(x, y, landiness) {
        var newDot,
          _this = this;
        newDot = {
          x: x,
          y: y,
          landiness: landiness,
          initial: {
            color: this.colorFor(this.xToLong(x), this.yToLat(y), landiness),
            radius: this.dotRadius * 0.64
          },
          target: {},
          dirty: true,
          setRadius: function(radius) {
            return _this.setRadius(x, y, radius);
          },
          setColor: function(color) {
            return _this.setColor(x, y, color);
          }
        };
        return newDot;
      }