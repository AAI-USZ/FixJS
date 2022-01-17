function (v) {
        if (!isNaN(v)) {
          velocity = zap.clamp(v, 0, this.max_velocity || Infinity);
          var th = this.a / 180 * Math.PI;
          this.vx = v * Math.cos(th);
          this.vy = v * Math.sin(th);
        }
      }