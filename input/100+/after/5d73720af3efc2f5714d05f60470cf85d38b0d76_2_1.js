function(doc) {
    glyph.coat(doc);
    self.documents.push(glyph.draw(self.metadata.style, packed));
    glyphPos = glyph.getBBox();
    laidout = false;
    for (var i = 0, l = layers.length; i < l; ++i) {
      for (var j = 0, m = layers[i].length; j < m; ++j) {
        if (glyph.overlapsWith(layers[i][j])) {
          next = true;
          break;
        }
      }
      if (!next) {
        glyph.adjustToLayer(i);
        layers[i].push(glyphPos);
        laidout = true;
        break;
      }
      next = false;
    }
    if (!laidout) {
      if (layers.length) {
        self.resize(self.canvas.width, self.canvas.height+40);
        glyph.adjustToLayer(i);
      }
      layers.push([glyphPos]);
    }
  }