function scrollCursorIntoView() {
      var coords = calculateCursorCoords();
      return scrollIntoView(coords.x, coords.y, coords.x, coords.yBot);
    }