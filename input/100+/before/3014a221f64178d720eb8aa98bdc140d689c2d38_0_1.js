function() {
      var dt, now, tank, tanks, _i, _j, _len, _len1;
      tanks = this.tanks.filter(function(tank) {
        return tank.life > 0;
      });
      if (tanks.length < 2) {
        return;
        end_game();
      }
      if (!(this.lt > 0)) {
        this.lt = new Date().getTime();
      }
      now = new Date().getTime();
      dt = (now - this.lt) / 1000.0;
      this.a += dt;
      for (_i = 0, _len = tanks.length; _i < _len; _i++) {
        tank = tanks[_i];
        tank.hit = false;
      }
      while (!(this.a < this.dt)) {
        for (_j = 0, _len1 = tanks.length; _j < _len1; _j++) {
          tank = tanks[_j];
          tank.step(this.dt, this.radar(tank, tanks));
        }
        this.fire(tanks);
        this.integrate(tanks);
        this.resolve_collisions(tanks);
        this.bullets = this.bullets.filter(function(bullet) {
          return !bullet.dead;
        });
        this.a -= this.dt;
      }
      this.lt = now;
      if (this.renderer) {
        return this.renderer.render(tanks, this.bullets);
      }
    }