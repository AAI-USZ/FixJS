function Server(annotationUrl) {
  if (this === window) {
    throw 'You forgot new';
  }
  this.annotationUrl = annotationUrl;
  this.annotations = [];
}