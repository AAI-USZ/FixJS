function db_getPlaceUrisByFrecency(maximum,
    callback) {
    var topSites = [];
    var transaction = this._db.transaction('places');
    var placesStore = transaction.objectStore('places');
    var frecencyIndex = placesStore.index('frecency');
    frecencyIndex.openCursor(null, IDBCursor.PREV).onsuccess = function(e) {
      var cursor = e.target.result;
      if (cursor && topSites.length < maximum) {
        topSites.push(cursor.value.uri);
        cursor.continue();
      } else {
        callback(topSites);
      }
    };
  }