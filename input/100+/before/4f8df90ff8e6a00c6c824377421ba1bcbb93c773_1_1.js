function(pos, callback) {
      var adjacentPos, direction, normalizedPos, positions;
      positions = {
        up: new SNAKE.Pair(pos.x, pos.y + 1),
        right: new SNAKE.Pair(pos.x + 1, pos.y),
        down: new SNAKE.Pair(pos.x, pos.y - 1),
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