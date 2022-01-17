function (dt) {
    if (this.ship) {
      this.layers.lives.sprites.forEach(function (life) {
        life.position(life.x, life.y,
          zap.rad2deg(Math.atan2(this.ship.y - life.y, this.ship.x - life.x)));
      }, this);
      this.ship.sprites.forEach(function (bullet) {
        if (bullet.is_bullet) {
          var asteroid = bullet.collide_radius(this.layers.asteroids.sprites);
          if (asteroid) {
            bullet.remove();
            this.score += asteroid.score;
            asteroid.split();
            if (!this.layers.asteroids.sprites.some(function (a) {
              return !a.hasOwnProperty("ttl");
            })) {
              this.ship.remove();
              ++this.level;
            }
          }
        }
      }, this);
      this.check_player_die();
    }
    if (this.shaking) {
      this.layers.forEach(function (layer) {
        layer.setAttribute("transform", "translate({0}, {1}) rotate({2})".fmt(
            zap.random_int_around(this.shaking.amp),
            zap.random_int_around(this.shaking.amp),
            zap.random_int_around(this.shaking.amp)));
      }, this);
    }
  }