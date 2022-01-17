function() {
  var gBBox = this.glyph.getBBox();
  return {
    start: gBBox.x,
    end: gBBox.x + gBBox.width
  }
}