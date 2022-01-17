function EmbeddedDocument (obj, parentArr, skipId) {
  if (parentArr) {
    this.__parentArray = parentArr;
    this.__parent = parentArr._parent;
  } else {
    this.__parentArray = undefined;
    this.__parent = undefined;
  }

  Document.call(this, obj, undefined, skipId);

  var self = this;
  this.on('isNew', function (val) {
    self.isNew = val;
  });
}