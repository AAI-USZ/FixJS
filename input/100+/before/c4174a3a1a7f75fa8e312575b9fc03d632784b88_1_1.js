function db_open(callback) {
    const DB_VERSION = 2;
    const DB_NAME = 'browser';
    var request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (function onUpgradeNeeded(e) {
      console.log('Browser database upgrade needed, upgrading.');
      this._db = e.target.result;
      this._initializeDB();
    }).bind(this);

    request.onsuccess = (function onSuccess(e) {
      this._db = e.target.result;
      callback();
    }).bind(this);

    request.onerror = (function onDatabaseError(e) {
      console.log('Error opening browser database');
    }).bind(this);
  }