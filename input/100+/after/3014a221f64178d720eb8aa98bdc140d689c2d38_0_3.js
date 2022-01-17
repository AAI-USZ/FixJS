function(tanks) {
      var bullet, dvx, dvy, dx, dy, hlen, i, impulse, j, len, len2, obstacle, rsum, tank, ti, tj, _i, _j, _k, _l, _len, _len1, _len2, _m, _ref, _ref1, _ref2, _ref3, _ref4, _results;
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
        _ref3 = this.obstacles;
        for (_l = 0, _len1 = _ref3.length; _l < _len1; _l++) {
          obstacle = _ref3[_l];
          dx = tank.x - obstacle.x;
          dy = tank.y - obstacle.y;
          len2 = dx * dx + dy * dy;
          rsum = tank.r + obstacle.r;
          if (len2 <= rsum * rsum) {
            len = Math.sqrt(len2);
            dx /= len;
            dy /= len;
            dvx = dx * tank.vx;
            dvy = dy * tank.vy;
            tank.x += dx * (rsum - len);
            tank.y += dy * (rsum - len);
            impulse = -1.51 * (dvx * dx + dvy * dy);
            if (impulse < 0) {
              tank.vx -= dx * impulse;
              tank.vy -= dy * impulse;
            }
          }
        }
      }
      _ref4 = this.bullets;
      _results = [];
      for (_m = 0, _len2 = _ref4.length; _m < _len2; _m++) {
        bullet = _ref4[_m];
        if (bullet.x > WIDTH || bullet.x < 0 || bullet.y < 0 || bullet.y > HEIGHT || this.does_collide(bullet)) {
          bullet.dead = true;
        }
        if (!!bullet.dead) {
          continue;
        }
        _results.push((function() {
          var _len3, _n, _results1;
          _results1 = [];
          for (_n = 0, _len3 = tanks.length; _n < _len3; _n++) {
            tank = tanks[_n];
            if (bullet.tank !== tank) {
              dx = bullet.x - tank.x;
              dy = bullet.y - tank.y;
              if (dx * dx + dy * dy <= (tank.r + bullet.r) * (tank.r + bullet.r)) {
                bullet.dead = true;
                tank.life -= bullet.power;
                tank.hit = true;
                bullet.tank.score += bullet.power;
                break;
              } else {
                _results1.push(void 0);
              }
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        })());
      }
      return _results;
    }