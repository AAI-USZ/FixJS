function (r, c) {
    for (var i = r; i < rows; i++) {
      if (grid[i][c]) return i - r;
    }
    return rows - r;
  }