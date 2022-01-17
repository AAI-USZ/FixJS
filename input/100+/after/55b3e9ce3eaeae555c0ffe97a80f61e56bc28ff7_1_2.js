function db_initializeDB() {
    var db = this._db;

    // Create or overwrite places object store
    if (db.objectStoreNames.contains('places'))
      db.deleteObjectStore('places');
    db.createObjectStore('places', { keyPath: 'uri' });

    // Create or overwrite visits object store
    if (db.objectStoreNames.contains('visits'))
      db.deleteObjectStore('visits');
    var visitStore = db.createObjectStore('visits', { autoIncrement: true });

    // Index visits by timestamp
    visitStore.createIndex('timestamp', 'timestamp', { unique: false });

    // Create or overwrite icon cache
    if (db.objectStoreNames.contains('icons'))
      db.deleteObjectStore('icons');
    db.createObjectStore('icons', { keyPath: 'uri' });

    // Create or overwrite bookmarks object store
    if (db.objectStoreNames.contains('bookmarks'))
      db.deleteObjectStore('bookmarks');
    var bookmarkStore = db.createObjectStore('bookmarks', { keyPath: 'uri' });

    // Index bookmarks by timestamp
    bookmarkStore.createIndex('timestamp', 'timestamp', { unique: false });
  }