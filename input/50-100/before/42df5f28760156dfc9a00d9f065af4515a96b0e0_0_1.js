function ensureObjectStore(osName, callback) {
  gazel.version++;

  openDatabase(function() {
    callback();
  }, null, function(db) {
    if(!db.objectStoreNames.contains(osName)) {
      db.createObjectStore(osName);
    }
  });
}