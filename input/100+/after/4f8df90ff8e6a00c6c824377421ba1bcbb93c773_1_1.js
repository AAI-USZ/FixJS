function(pos, callback) {
      var adjacentPos, direction, normalizedPos, positions;
      positions = {
        down: new SNAKE.Pair(pos.x, pos.y + 1),
        right: new SNAKE.Pair(pos.x + 1, pos.y),
        up: new SNAKE.Pair(pos.x, pos.y - 1),
        left: new SNAKE.Pair(pos.x - 1, pos.y)
      };
      for (direction in positions) {
        adjacentPos = positions[direction];
        normalizedPos = this.moduloBoundaries(adjacentPos);
        if (false === callback(normalizedPos, direction)) {
          return;
        }
      }
    }