function ad_query(dbName, storeName, func, callback, data) {

    var request = indexedDB.open(dbName, 5);

    request.onsuccess = function(event) {
      func(request.result, storeName, callback, data);
    };

    request.onerror = function(event) {
      console.error('Can\'t open database', dbName, event);
    };

    // DB init
    request.onupgradeneeded = function(event) {
      console.log('Upgrading db');
      var db = event.target.result;
      if (db.objectStoreNames.contains(storeName))
        db.deleteObjectStore(storeName);
      db.createObjectStore(storeName, {keyPath: 'id', autoIncrement: true});
      console.log('Upgrading db done');
    };
  }