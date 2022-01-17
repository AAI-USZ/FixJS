function(bullet) {
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
    }