function() {

    function Renderer(graphics) {
      this.graphics = graphics;
    }

    Renderer.prototype.render = function(tanks, bullets) {
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
    };

    Renderer.prototype.render_bullet = function(bullet) {
      this.graphics.beginStroke(bullet.tank.color);
      this.graphics.drawCircle(bullet.x, bullet.y, 1 + Math.log(2 + bullet.r));
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

  }