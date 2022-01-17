function(pos) {
      var adjacentPos, edges, posDownY, posLeftX, posRightX, posUpY, positions, _i, _len;
      if (this.squareHasType('snake', pos)) {
        return;
      }
      posDownY = (pos.y + 1) % (this.squaresY - 1);
      posRightX = (pos.x + 1) % (this.squaresX - 1);
      posUpY = pos.y === 0 ? this.squaresY - 1 : pos.y - 1;
      posLeftX = pos.x === 0 ? this.squaresX - 1 : pos.x - 1;
      positions = [new Game.Pair(pos.x, posUpY), new Game.Pair(posRightX, pos.y), new Game.Pair(pos.x, posDownY), new Game.Pair(posLeftX, pos.y)];
      edges = [];
      for (_i = 0, _len = positions.length; _i < _len; _i++) {
        adjacentPos = positions[_i];
        if (this.squareHasType('snake', adjacentPos)) {
          continue;
        }
        edges.push([pos.toString(), adjacentPos.toString()]);
      }
      return edges;
    }