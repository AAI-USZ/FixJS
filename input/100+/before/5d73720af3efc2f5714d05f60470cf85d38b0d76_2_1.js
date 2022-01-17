function(doc) {
    glyph.coat(doc);
    self.documents.push(glyph.draw(self.metadata.style, packed));
    glyphPos = glyph.getBBox();
    laidout = false;
    for (var i = 0, l = layers.length; i < l; ++i) {
      for (var j = 0, m = layers[i].length; j < m; ++j) {
        start_overlap = glyphPos.start >= layers[i][j]['start'] && glyphPos.start <= layers[i][j]['end'];
        end_overlap = glyphPos.end >= layers[i][j]['start'] && glyphPos.end <= layers[i][j]['end'];
        if (start_overlap || end_overlap) {
          next = true;
          break;
        }
      }
      if (!next) {
        glyph.adjustToLayer(i);
        layers[i].push(glyph.getBBox());
        laidout = true;
        break;
      }
      next = false;
    }
    if (!laidout) {
      if (layers.length) {
        self.resize(self.canvas.width, self.canvas.height+40);
      }
      glyph.adjustToLayer(i);
      layers.push([glyph.getBBox()]);
    }
  }