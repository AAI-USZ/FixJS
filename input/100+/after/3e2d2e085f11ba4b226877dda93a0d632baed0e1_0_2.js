function (n) {
    var r = Math.floor(Math.min(this.vb.width, this.vb.height) / 4);
    if (typeof n === "number") {
      zap.remove_sprites(this.layers.asteroids);
      for (var i = 0; i < n; ++i) {
        var asteroid = this.make_asteroid(3);
        var th = Math.random() * 2 * Math.PI;
        var rr = zap.random_int(r, r * 2);
        asteroid.position(this.vb.width / 2 + rr * Math.cos(th),
          this.vb.height / 2 + rr * Math.sin(th));
        asteroid.vx = zap.random_int_signed($ASTEROID_V_MIN, $ASTEROID_V_MAX);
        asteroid.vy = zap.random_int_signed($ASTEROID_V_MIN, $ASTEROID_V_MAX);
        asteroid.va = zap.random_int_signed($ASTEROID_V_MIN, $ASTEROID_V_MAX) /
          $ASTEROID_VA_RATE;
      }
    } else {
      n.forEach(function (asteroid) {
        var th = Math.random() * 2 * Math.PI;
        var rr = zap.random_int(r, r * 2);
        asteroid.position(this.vb.width / 2 + rr * Math.cos(th),
          this.vb.height / 2 + rr * Math.sin(th));
      }, this);
    }
  }