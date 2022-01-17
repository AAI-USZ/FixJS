function db_initializeDB() {
    var db = this._db;

    // Create or overwrite places object store
    if (db.objectStoreNames.contains('places'))
      db.deleteObjectStore('places');
    var placeStore = db.createObjectStore('places', { keyPath: 'uri' });

    // Create or overwrite visits object store
    if (db.objectStoreNames.contains('visits'))
      db.deleteObjectStore('visits');
    var visitStore = db.createObjectStore('visits', { autoIncrement: true });

    // Index visits by timestamp
    visitStore.createIndex('timestamp', 'timestamp', { unique: false });

    // Create or overwrite icon cache
    if (db.objectStoreNames.contains('icons'))
      db.deleteObjectStore('icons');
    var iconStore = db.createObjectStore('icons', { keyPath: 'uri' });
  }