function(cm) {
  addBigDoc(cm, 35, 70);
  for (var ch = 0; ch <= 35; ch += 5) {
    for (var line = 0; line < 70; line += 5) {
      cm.setCursor(line, ch);
      var coords = cm.charCoords({line: line, ch: ch});
      var pos = cm.coordsChar({x: coords.x, y: coords.y + 1});
      eq(pos.line, line);
      eq(pos.ch, ch);
    }
  }
}