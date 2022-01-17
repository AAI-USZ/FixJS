function() {
  var fields = JSON.parse(this.buffer);
  for (var field in fields) {
    // JSON is hierarchical, no clue about recursive
    this.onField(field, fields[field]);
  }
  this.buffer = '';

  this.onEnd();
}