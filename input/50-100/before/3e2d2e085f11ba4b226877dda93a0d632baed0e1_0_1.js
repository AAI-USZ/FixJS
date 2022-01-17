function (bullet) {
        if (bullet.is_bullet) {
          var asteroid = bullet.collide_radius(this.layers.asteroids.sprites);
          if (asteroid) {
            bullet.remove();
            this.score += asteroid.score;
            asteroid.split();
            if (this.layers.asteroids.sprites.length === 0) {
              //this.start_level();
            }
          }
        }
      }