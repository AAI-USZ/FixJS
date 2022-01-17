function (item) {
    var terrain;
    if (item === '\n') {
      r += 1;
      c = left;
    } else {
      terrain = parseSourceItem(item);
      self.tiles.push(self._entityFactory.createTile(c, r, terrain));
      c += 1;
    }
  }