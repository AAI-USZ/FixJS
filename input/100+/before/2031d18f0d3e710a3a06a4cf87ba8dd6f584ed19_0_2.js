function(x, y, landiness) {
        var newDot;
        newDot = {
          x: x,
          y: y,
          landiness: landiness,
          initial: {
            color: this.colorFor(this.xToLong(x), this.yToLat(y), landiness),
            radius: this.dotRadius * 0.64
          },
          target: {},
          dirty: true
        };
        return newDot;
      }