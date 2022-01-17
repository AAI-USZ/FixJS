function(doc) {
  this.document = doc;
  if (this.document.strand) {
    this.drawShape = this.drawOrientedShape;
  } else {
    this.drawShape = this.drawShape;
  }
}