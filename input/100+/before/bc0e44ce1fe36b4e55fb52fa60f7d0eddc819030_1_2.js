function db_updatePlaceFrecency(uri, callback) {
    var transaction = this._db.transaction(['places'],
      IDBTransaction.READ_WRITE);

    var objectStore = transaction.objectStore('places');
    var readRequest = objectStore.get(uri);

    readRequest.onsuccess = function(event) {
      var place = event.target.result;
      if (!place)
        return;

      if (!place.frecency) {
        place.frecency = 1;
      } else {
        // currently just frequency
        place.frecency++;
      }

      var writeRequest = objectStore.put(place);

      writeRequest.onerror = function() {
        console.log('Error while saving new frecency for ' + uri);
      };

      writeRequest.onsuccess = function() {
        if (callback)
          callback();
      };

    };

    transaction.onerror = function dbTransactionError(e) {
      console.log('Transaction error while trying to update place: ' +
        place.uri);
    };
  }