function openDB(success, error) {
    try {
      var indexedDB = window.indexedDB || window.webkitIndexedDB ||
                      window.mozIndexedDB || window.msIndexedDB;
    } catch (e) {
      error(e);
      return;
    }

    if (!indexedDB) {
      error('Indexed DB is not available!!!');
      return;
    }

    try {
      var request = indexedDB.open(DB_NAME, VERSION);
      request.onsuccess = function(event) {
        database = event.target.result;
        success();
      };

      request.onerror = function(event) {
        error('Database error: ' + event.target.errorCode);
      };

      request.onupgradeneeded = function(event) {
        var db = event.target.result;
        var objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        objectStore.createIndex('byPage', 'id', { unique: true });
      };
    } catch (ex) {
      error(ex.message);
    }
  }