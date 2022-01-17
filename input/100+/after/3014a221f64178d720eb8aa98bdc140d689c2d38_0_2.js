function(tanks) {
      var bullet, dx, dy, tank, _i, _j, _len, _len1, _ref, _results;
      _ref = this.bullets;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        bullet = _ref[_i];
        bullet.x += bullet.vx * this.dt;
        bullet.y += bullet.vy * this.dt;
      }
      _results = [];
      for (_j = 0, _len1 = tanks.length; _j < _len1; _j++) {
        tank = tanks[_j];
        tank.fx -= tank.vx * 0.4;
        tank.fy -= tank.vy * 0.4;
        dx = Math.min(Math.max(tank.vx * this.dt + 0.5 * tank.fx * this.dt2, -1.5), 1.5);
        dy = Math.min(Math.max(tank.vy * this.dt + 0.5 * tank.fy * this.dt2, -1.5), 1.5);
        tank.vx = dx / this.dt;
        tank.vy = dy / this.dt;
        tank.x += dx;
        tank.y += dy;
        _results.push(tank.bearing += tank.dbearing);
      }
      return _results;
    }