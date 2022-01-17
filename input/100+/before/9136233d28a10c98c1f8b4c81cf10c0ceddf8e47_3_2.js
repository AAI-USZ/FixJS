function(pos, callback) {
      var adjacentPos, direction, normalizedPos, positions, _i, _len;
      positions = {
        up: new Game.Pair(pos.x, pos.y + 1),
        right: new Game.Pair(pos.x + 1, pos.y),
        down: new Game.Pair(pos.x, pos.y - 1),
        left: new Game.Pair(pos.x - 1, pos.y)
      };
      for (adjacentPos = _i = 0, _len = positions.length; _i < _len; adjacentPos = ++_i) {
        direction = positions[adjacentPos];
        normalizedPos = this.moduloBoundaries(adjacentPos);
        if (false === callback(normalizedPos, direction)) {
          return;
        }
      }
    }