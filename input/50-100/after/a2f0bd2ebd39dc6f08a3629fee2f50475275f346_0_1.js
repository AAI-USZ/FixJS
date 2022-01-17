function (r, c, rs, cs, val) {
    for (var i = r; i < r + rs; i++) {
      for (var j = c; j < c + cs; j++) {
        grid[i][j] = val;
      }
    }
  }