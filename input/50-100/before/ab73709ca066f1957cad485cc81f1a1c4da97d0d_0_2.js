function(other) {
  var merge = new Merge();
  merge.addDocument(this._raw);
  merge.addDocument(other);
  this._raw = merge.finalize();
}