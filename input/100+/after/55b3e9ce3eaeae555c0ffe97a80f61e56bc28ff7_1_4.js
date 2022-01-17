function db_clearBookmarks(callback) {
    var db = Places.db._db;
    var transaction = db.transaction('bookmarks',
      IDBTransaction.READ_WRITE);
    transaction.onerror = function dbTransactionError(e) {
      console.log('Transaction error while trying to clear bookmarks');
    };
    var objectStore = transaction.objectStore('bookmarks');
    var request = objectStore.clear();
    request.onsuccess = function() {
      callback();
    };
    request.onerror = function(e) {
      console.log('Error clearing bookmarks object store');
    };
  }