function() {
  this.id; // triggers getter which ensures an id

  var merge = new Merge();
  merge.addDocument(this._raw);
  this._raw = merge.finalize();
}