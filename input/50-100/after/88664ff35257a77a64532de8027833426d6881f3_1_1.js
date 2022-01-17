function (header) {
  for (var h = this.count() - 1; h >= 0; h--) {
    if (this.headers[h].className === header.className) {
      delete this.headers.splice(h, 1); //if exists, remove then add to recreate
    }
  }
  this.headers.push(header);
  this.headers.sort(function (a, b) {
    return a.priority || 0 - b.priority || 0
  });
}