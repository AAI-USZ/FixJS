function (path, err) {
  if (!this.parent) return false;
  var index = this.parentArray.indexOf(this);
  var parentPath = this.parentArray._path;
  var fullPath = [parentPath, index, path].join('.');
  this.parent.invalidate(fullPath, err);
  return true;
}