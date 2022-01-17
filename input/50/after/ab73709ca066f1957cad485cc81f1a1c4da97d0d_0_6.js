function() {
  this.id; // triggers getter which ensures an id

  var merge = new Merge();
  merge.addDocument(this.body);
  this.body = merge.finalize();
}