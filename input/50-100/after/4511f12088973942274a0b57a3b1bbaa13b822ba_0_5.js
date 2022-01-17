function () {
  this.viewState = 'small';
  this.compact();
  this.controlDiv.hide();
  this.div.css({zIndex: '9990'});
  if (this.rangePosition) {
    highlightAnnotationRange(this.rangePosition, styles.annotationBackground);
  }
  if (this.server.raisedAnnotation === this) {
    this.server.raisedAnnotation = null;
  }
}