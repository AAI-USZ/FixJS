function(grid, pos) {
      var edges, square, squareBottomY, squareLeftX, squares, _i, _len;
      if (grid.squareHasType('snake', pos)) return;
      if (this.vertexCount == null) this.vertexCount = 0;
      squareBottomY = pos.y === 0 ? this.squaresY - 1 : pos.x - 1;
      squareLeftX = pos.x === 0 ? this.squaresX - 1 : pos.x - 1;
      squares = [Game.Pair(pos.x, pos.y + 1 % this.squaresY), Game.Pair(pos.x + 1 % this.squaresX, pos.y), Game.Pair(pos.x, squaresBottomY), Game.Pair(squareLeftX, pos.y)];
      edges = [];
      for (_i = 0, _len = squares.length; _i < _len; _i++) {
        square = squares[_i];
        if (grid.squareHasType('snake', square)) continue;
        edges.push([this.vertexCount, this.vertexCount + 1]);
        this.vertexCount += 2;
      }
      return edges;
    }