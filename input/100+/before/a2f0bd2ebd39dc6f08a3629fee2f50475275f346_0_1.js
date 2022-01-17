function () {
  var removeAll = function (img) {
    for (var r = 0; r < gridRows; r++) {
      for (var c = 0; c < gridCols; c++) {
        if (grid[r][c] === img) {
          delete grid[r][c];
        }
      }
    }
  };

  var wipeOut = function (r, c, rs, cs) {
    var finishHim = function (img) {
      img.fadeOut(function () { img.remove(); });
    };
    for (var i = r; i < r + rs; i++) {
      for (var j = c; j < c + cs; j++) {
        var img = grid[i][j];
        if (img) {
          finishHim(img);
          removeAll(img);
        }
      }
    }
  };

  if (wipeCount % 5 == 4) {
    // flash(0, 0, gridRows, gridCols);
    wipeOut(0, 0, gridRows, gridCols);
  } else {
    var r1 = Math.floor(Math.random() * gridRows);
    var r2 = Math.floor(Math.random() * gridRows);
    var c1 = Math.floor(Math.random() * gridCols);
    var c2 = Math.floor(Math.random() * gridCols);
    if (r2 < r1) { var tmp = r1; r1 = r2; r2 = tmp; }
    if (c2 < c1) { var tmp = c1; c1 = c2; c2 = tmp; }
    flash(r1, c1, r2 - r1, c2 - c1);
    wipeOut(r1, c1, r2 - r1, c2 - c1);
  }
  wipeCount++;

  loadingImage();
  setTimeout(function () {
    fill(0, 0, gridRows, gridCols);
    loadedImage();
  }, 1000);
}