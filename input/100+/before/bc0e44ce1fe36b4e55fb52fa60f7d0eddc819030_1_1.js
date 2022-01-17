function db_clearPlaces(callback) {
    var db = Places.db._db;
    var transaction = db.transaction('places',
      IDBTransaction.READ_WRITE);
    transaction.onerror = function dbTransactionError(e) {
      console.log('Transaction error while trying to clear places');
    };
    var objectStore = transaction.objectStore('places');
    var request = objectStore.clear();
    request.onsuccess = function() {
      callback();
    };
    request.onerror = function(e) {
      console.log('Error clearing places object store');
    };
  }