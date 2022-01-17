function(other) {
  var merge = new Merge();
  if (!this.empty) {
    merge.addDocument(this.body);
  } else {
    this.empty = false;
  }
  merge.addDocument(other);
  this.body = merge.finalize();
  return true;
}