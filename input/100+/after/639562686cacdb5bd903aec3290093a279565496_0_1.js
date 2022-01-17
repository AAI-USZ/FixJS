function positionticknums() {
    for (var i = 0; i < 3; i++) {
      if (hasaxes[i]) {
        for (var j = 0; j < ticknums[i].length; j++) {
          var tickpos = toCanvasCoords(ticks[i][j].geometry.vertices[0]);
          ticknums[i][j].style.left = tickpos.x.toString() + "px";
          ticknums[i][j].style.top = tickpos.y.toString() + "px";
        }
      }
    }
  }