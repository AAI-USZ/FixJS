function(x, y) {

  if( an.g.undoManager.shouldRegister(this, this.moveTo) ) {
    var pt = this.getBeginPoint();
    an.g.undoManager.registerUndo(this, this.moveTo, [pt.x, pt.y]);
  }

  for(var i = 0; i < this.edges.length; i++) {
    this.edges[i].translate(x, y);
  }
}