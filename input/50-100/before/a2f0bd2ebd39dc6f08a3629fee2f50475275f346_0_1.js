function (r, c) {
    for (var i = c; i < cols; i++) {
      if (grid[r][i]) return i - c;
    }
    return cols - c;
  }