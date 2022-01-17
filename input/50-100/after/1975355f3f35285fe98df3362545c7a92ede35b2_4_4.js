function (path, err) {
  if (!this.__parent) return false;
  var index = this.__parentArray.indexOf(this);
  var parentPath = this.__parentArray._path;
  var fullPath = [parentPath, index, path].join('.');
  this.__parent.invalidate(fullPath, err);
  return true;
}