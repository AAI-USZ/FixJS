function(tanks, bullets) {
      var bullet, tank, _i, _j, _len, _len1, _results;
      this.graphics.clear();
      this.graphics.setStrokeStyle(4, "round");
      this.graphics.beginStroke("#000000");
      for (_i = 0, _len = tanks.length; _i < _len; _i++) {
        tank = tanks[_i];
        this.render_tank(tank);
      }
      _results = [];
      for (_j = 0, _len1 = bullets.length; _j < _len1; _j++) {
        bullet = bullets[_j];
        _results.push(this.render_bullet(bullet));
      }
      return _results;
    }