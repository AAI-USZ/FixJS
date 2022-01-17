function (path) {
  if (!this.parentArray) return;

  this._activePaths.modify(path);

  if (this.isNew) {
    // Mark the WHOLE parent array as modified
    // if this is a new document (i.e., we are initializing
    // a document),
    this.parentArray._markModified();
  } else
    this.parentArray._markModified(this, path);
}