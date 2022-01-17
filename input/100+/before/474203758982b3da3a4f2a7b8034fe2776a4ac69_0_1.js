function MemoryQuery (json) {
  this.ns = json.from;
  this._json = json;
  var filteredJson = objectExcept(json, ['only', 'except', 'limit', 'skip', 'sort', 'type']);
  this._filter = filterFnFromQuery(filteredJson);
  for (var k in json) {
    if (k === 'type') {
      // find() or findOne()
      this[json[k]]();
    } else if (k in this) {
      this[k](json[k]);
    }
  }
}