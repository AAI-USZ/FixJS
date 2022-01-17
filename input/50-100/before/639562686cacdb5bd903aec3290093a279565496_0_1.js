function hideticknums() {
    for (var i = 0; i < 3; i++) {
      if (hasaxes[i]) {
        for (var j = 0; j < ticknums[i].length; j++) {
          ticknums[i][j].style.display = "none";
        }
      }
    }
  }