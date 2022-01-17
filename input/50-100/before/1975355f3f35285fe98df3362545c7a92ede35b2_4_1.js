function EmbeddedDocument (obj, parentArr, skipId) {
  if (parentArr) {
    this.parentArray = parentArr;
    this.parent = parentArr._parent;
  }

  Document.call(this, obj, undefined, skipId);

  var self = this;
  this.on('isNew', function (val) {
    self.isNew = val;
  });
}