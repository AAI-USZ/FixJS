function (r, c, rs, cs) {
    if (r + rs > gridRows || c + cs > gridCols) {
      return false;
    }
    for (var i = r; i < r + rs; i++) {
      for (var j = c; j < c + cs; j++) {
        if (grid[i][j]) {
          return false;
        }
      }
    }
    return true;
  }