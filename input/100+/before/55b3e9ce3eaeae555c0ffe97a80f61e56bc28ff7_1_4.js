function db_saveIcon(iconEntry, callback) {
    var transaction = this._db.transaction(['icons'],
      IDBTransaction.READ_WRITE);
    transaction.onerror = function dbTransactionError(e) {
      console.log('Transaction error while trying to save icon');
    };

    var objectStore = transaction.objectStore('icons');
    var request = objectStore.put(iconEntry);

    request.onsuccess = function onsuccess(e) {
      if (callback)
        callback();
    };

    request.onerror = function onerror(e) {
      console.log('Error while saving icon');
    };
  }