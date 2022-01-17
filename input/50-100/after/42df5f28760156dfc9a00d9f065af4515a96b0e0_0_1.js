function ensureObjectStore(osName, callback, errback) {
  gazel.version++;

  openDatabase(function() {
    callback();
  }, errback, function(db) {
    if(!db.objectStoreNames.contains(osName)) {
      db.createObjectStore(osName);
    }
  });
}