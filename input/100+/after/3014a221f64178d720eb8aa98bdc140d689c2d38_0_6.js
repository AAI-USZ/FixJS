function(tanks, bullets, obstacles) {
      var bullet, obstacle, tank, _i, _j, _k, _len, _len1, _len2, _results;
      this.graphics.clear();
      for (_i = 0, _len = tanks.length; _i < _len; _i++) {
        tank = tanks[_i];
        this.render_tank(tank);
      }
      for (_j = 0, _len1 = bullets.length; _j < _len1; _j++) {
        bullet = bullets[_j];
        this.render_bullet(bullet);
      }
      this.graphics.setStrokeStyle(4, "round");
      this.graphics.beginStroke("#000000");
      this.graphics.rect(0, 0, WIDTH, HEIGHT);
      _results = [];
      for (_k = 0, _len2 = obstacles.length; _k < _len2; _k++) {
        obstacle = obstacles[_k];
        _results.push(this.render_obstacle(obstacle));
      }
      return _results;
    }