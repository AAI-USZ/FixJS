function(pos, callback) {
      var adjacentPos, direction, normalizedPos, positions;
      positions = {
        up: new Game.Pair(pos.x, pos.y + 1),
        right: new Game.Pair(pos.x + 1, pos.y),
        down: new Game.Pair(pos.x, pos.y - 1),
        left: new Game.Pair(pos.x - 1, pos.y)
      };
      for (direction in positions) {
        adjacentPos = positions[direction];
        normalizedPos = this.moduloBoundaries(adjacentPos);
        if (false === callback(normalizedPos, direction)) {
          return;
        }
      }
    }