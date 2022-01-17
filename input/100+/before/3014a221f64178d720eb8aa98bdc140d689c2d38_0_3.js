function(tanks) {
      var bullet, dvx, dvy, dx, dy, hlen, i, impulse, j, len, len2, tank, ti, tj, _i, _j, _k, _l, _len, _len1, _len2, _m, _ref, _ref1, _ref2, _ref3, _results;
      for (i = _i = 0, _ref = tanks.length - 2; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        ti = tanks[i];
        for (j = _j = _ref1 = i + 1, _ref2 = tanks.length - 1; _ref1 <= _ref2 ? _j <= _ref2 : _j >= _ref2; j = _ref1 <= _ref2 ? ++_j : --_j) {
          tj = tanks[j];
          dx = tj.x - ti.x;
          dy = tj.y - ti.y;
          len2 = dx * dx + dy * dy;
          if (len2 <= (ti.r + tj.r) * (ti.r + tj.r)) {
            len = Math.sqrt(len2);
            dx /= len;
            dy /= len;
            dvx = tj.vx - ti.vx;
            dvy = tj.vy - ti.vy;
            impulse = -1 * (dvx * dx + dvy * dy);
            hlen = ti.r + tj.r - len;
            ti.x -= dx * hlen;
            ti.y -= dy * hlen;
            tj.x += dx * hlen;
            tj.y += dy * hlen;
            ti.vx -= dx * impulse;
            ti.vy -= dy * impulse;
            tj.vx += dx * impulse;
            tj.vy += dy * impulse;
          }
        }
      }
      for (_k = 0, _len = tanks.length; _k < _len; _k++) {
        tank = tanks[_k];
        dx = 0;
        dy = 0;
        if (tank.x <= tank.r) {
          dx = 1;
        }
        if (tank.x >= WIDTH - tank.r) {
          dx = -1;
        }
        if (tank.y <= tank.r) {
          dy = 1;
        }
        if (tank.y >= HEIGHT - tank.r) {
          dy = -1;
        }
        if (dx) {
          tank.x += dx;
          tank.vx *= -0.51;
        }
        if (dy) {
          tank.y += dy;
          tank.vy *= -0.51;
        }
      }
      _ref3 = this.bullets;
      _results = [];
      for (_l = 0, _len1 = _ref3.length; _l < _len1; _l++) {
        bullet = _ref3[_l];
        for (_m = 0, _len2 = tanks.length; _m < _len2; _m++) {
          tank = tanks[_m];
          if (bullet.tank !== tank) {
            dx = bullet.x - tank.x;
            dy = bullet.y - tank.y;
            if (dx * dx + dy * dy <= (tank.r + bullet.r) * (tank.r + bullet.r)) {
              bullet.dead = true;
              tank.life -= bullet.power;
              tank.hit = true;
              bullet.tank.score += bullet.power;
              break;
            }
          }
        }
        if (bullet.x > WIDTH || bullet.x < 0 || bullet.y < 0 || bullet.y > HEIGHT) {
          _results.push(bullet.dead = true);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }