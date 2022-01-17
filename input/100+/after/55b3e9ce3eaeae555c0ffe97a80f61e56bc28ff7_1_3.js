function db_saveVisit(visit, callback) {
    var transaction = this._db.transaction(['visits'],
      IDBTransaction.READ_WRITE);
    transaction.onerror = function dbTransactionError(e) {
      console.log('Transaction error while trying to save visit');
    };

     var objectStore = transaction.objectStore('visits');
     var request = objectStore.add(visit);

     request.onerror = function onerror(e) {
       console.log('Error while adding visit to global history store');
     };

     request.onsuccess = function onsuccess(e) {
       if (callback)
         callback();
     };
  }