function() {
  var Bullet, DBEARING_MAX, HEIGHT, MAX_SENSOR_NOISE, Obstacle, Renderer, Tank, WIDTH, root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  WIDTH = 960;

  HEIGHT = 480;

  DBEARING_MAX = Math.PI / 4;

  MAX_SENSOR_NOISE = 3;

  root.Game = (function() {

    Game.prototype.dt = 1 / 60;

    Game.prototype.dt2 = 1 / 3600;

    function Game(seed, graphics) {
      this.seed = seed;
      this.tanks = [];
      this.bullets = [];
      this.obstacles = [new Obstacle(60, WIDTH / 2, HEIGHT / 2)];
      this.lt = 0;
      this.a = 0;
      if (graphics) {
        this.renderer = new Renderer(graphics);
      }
    }

    Game.prototype.register_tank = function(name, step, init) {
      if (init == null) {
        init = null;
      }
      return this.tanks.push(new Tank(name, step, init));
    };

    Game.prototype.init = function() {
      var tank, _i, _len, _ref, _results;
      _ref = this.tanks;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tank = _ref[_i];
        _results.push(tank.init(this.tanks.length - 1));
      }
      return _results;
    };

    Game.prototype.step = function() {
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
        return this.renderer.render(tanks, this.bullets, this.obstacles);
      }
    };

    Game.prototype.radar = function(tank, tanks) {
      var t, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = tanks.length; _i < _len; _i++) {
        t = tanks[_i];
        if (t !== tank) {
          _results.push(this.sensor(t));
        }
      }
      return _results;
    };

    Game.prototype.sensor = function(tank) {
      return {
        x: tank.x - MAX_SENSOR_NOISE + Math.random() * MAX_SENSOR_NOISE,
        y: tank.y - MAX_SENSOR_NOISE + Math.random() * MAX_SENSOR_NOISE
      };
    };

    Game.prototype.integrate = function(tanks) {
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
    };

    Game.prototype.fire = function(tanks) {
      var bullet, tank, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = tanks.length; _i < _len; _i++) {
        tank = tanks[_i];
        if (tank.gun_heat <= tank.fire_command) {
          bullet = new Bullet(tank, tank.fire_command);
          tank.gun_heat += tank.fire_command;
          _results.push(this.bullets.push(bullet));
        } else {
          _results.push(tank.gun_heat -= this.dt);
        }
      }
      return _results;
    };

    Game.prototype.resolve_collisions = function(tanks) {
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
    };

    Game.prototype.does_collide = function(bullet) {
      var dx, dy, obstacle, _i, _len, _ref;
      _ref = this.obstacles;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        obstacle = _ref[_i];
        dx = bullet.x - obstacle.x;
        dy = bullet.y - obstacle.y;
        if (dx * dx + dy * dy <= Math.pow(bullet.r + obstacle.r, 2)) {
          return true;
        }
      }
      return false;
    };

    Game.prototype.end_game = function() {
      return alert("End of game.");
    };

    return Game;

  })();

  Tank = (function() {

    function Tank(name, step_target, init_target) {
      var rc;
      this.name = name;
      this.step_target = step_target;
      this.init_target = init_target;
      this.r = 20;
      rc = Math.random() * 0xBB | (Math.random() * 0xBB) << 8 | (Math.random() * 0xBB) << 16;
      this.color = "#" + rc.toString(16);
      this.x = Math.random() * (WIDTH - 2 * this.r);
      this.y = Math.random() * (HEIGHT - 2 * this.r);
      this.vx = this.vy = this.gun_heat = this.score = 0;
      this.life = 100;
      this.bearing = Math.random() * 2 * Math.PI;
    }

    Tank.prototype.init = function(num_tanks) {
      if (this.init_target) {
        return this.init_target(num_tanks);
      }
    };

    Tank.prototype.step = function(dt, radar) {
      this.fx = this.fy = this.dbearing = 0;
      return this.step_target.apply(null, [dt, this.to_state(radar)]);
    };

    Tank.prototype.to_state = function(radar) {
      var tank,
        _this = this;
      this.fx = this.fy = this.dbearing = 0.0;
      tank = this;
      return {
        x: this.x,
        y: this.y,
        radius: this.r,
        vx: this.vx,
        vy: this.vy,
        turn: function(bearing) {
          return tank.dbearing = Math.min(Math.max(-DBEARING_MAX, bearing), DBEARING_MAX);
        },
        exert: function(fx, fy) {
          tank.fx += fx;
          return tank.fy += fy;
        },
        fire: function(power) {
          return tank.fire_command = Math.min(Math.max(0.1, power.toFixed(1)), 5.0);
        },
        bearing: this.bearing,
        radar: radar,
        gun_heat: this.gun_heat,
        life: this.life,
        score: this.score
      };
    };

    return Tank;

  })();

  Bullet = (function() {

    function Bullet(tank, power) {
      var i, j;
      this.tank = tank;
      this.power = power;
      i = Math.cos(this.tank.bearing);
      j = Math.sin(this.tank.bearing);
      this.r = 1 + this.power;
      this.power = Math.pow(2, 1 + this.power);
      this.x = this.tank.x + i * (tank.r + this.r - 6);
      this.y = this.tank.y + j * (tank.r + this.r - 6);
      this.vx = i * 200;
      this.vy = j * 200;
    }

    return Bullet;

  })();

  Obstacle = (function() {

    function Obstacle(r, x, y) {
      this.r = r;
      this.x = x;
      this.y = y;
    }

    return Obstacle;

  })();

  Renderer = (function() {

    function Renderer(graphics) {
      this.graphics = graphics;
    }

    Renderer.prototype.render = function(tanks, bullets, obstacles) {
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
    };

    Renderer.prototype.render_obstacle = function(obstacle) {
      this.graphics.setStrokeStyle(4, "round");
      this.graphics.beginStroke("#000000");
      this.graphics.drawCircle(obstacle.x, obstacle.y, obstacle.r);
      return this.graphics.endStroke();
    };

    Renderer.prototype.render_bullet = function(bullet) {
      this.graphics.beginStroke(bullet.tank.color);
      this.graphics.drawCircle(bullet.x, bullet.y, (2 + bullet.r) / 2);
      return this.graphics.endStroke();
    };

    Renderer.prototype.render_tank = function(tank) {
      var cos, sin;
      this.graphics.setStrokeStyle(2, "round");
      this.graphics.beginStroke((tank.hit ? "#FF0000" : tank.color));
      this.graphics.drawCircle(tank.x, tank.y, tank.r);
      cos = Math.cos(tank.bearing);
      sin = Math.sin(tank.bearing);
      this.graphics.endStroke();
      this.graphics.setStrokeStyle(2, "round");
      this.graphics.beginStroke((tank.hit ? "#FF0000" : tank.color));
      this.graphics.moveTo(tank.x + -3 * cos - -3 * sin, tank.y + -3 * sin + -3 * cos);
      this.graphics.lineTo(tank.x + -3 * cos - 3 * sin, tank.y + -3 * sin + 3 * cos);
      this.graphics.lineTo(tank.x + (tank.r - 6) * cos - 3 * sin, tank.y + (tank.r - 6) * sin + 3 * cos);
      this.graphics.lineTo(tank.x + (tank.r - 6) * cos - -3 * sin, tank.y + (tank.r - 6) * sin + -3 * cos);
      this.graphics.lineTo(tank.x + -3 * cos - -3 * sin, tank.y + -3 * sin + -3 * cos);
      return this.graphics.endStroke();
    };

    return Renderer;

  })();

}