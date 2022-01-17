function () {
  var self = this;
  var source = 'wwwggwggwgwggw\nggwggwgwgwgwgw\ngwgwgwgwgwgwwww\ngggwgggggwggwgwggwg';
  var left = -10;
  var top = -10;
  var c = left;
  var r = top;
  var terrainLookup = {
    g:'grass',
    w:'water'
  };

  function parseSourceItem(item) {
    var terrain = terrainLookup[item];
    if (!terrain) {
      terrain = 'unknown';
    }
    return terrain;
  }

  goog.array.forEach(source.split(''), function (item) {
    var terrain;
    if (item === '\n') {
      r += 1;
      c = left;
    } else {
      terrain = parseSourceItem(item);
      self.tiles.push(self._entityFactory.createTile(c, r, terrain));
      c += 1;
    }
  });

}