function re_init() {
    var indexedDB = window.indexedDB || window.webkitIndexedDB ||
        window.mozIndexedDB || window.msIndexedDB;

    this._openreq = indexedDB.open(this.DBNAME);

    var self = this;
    this._openreq.onsuccess = function re_dbOnSuccess() {
      self._recentsDB = self._openreq.result;
    };

    this._openreq.onerror = function re_dbOnError(e) {
      console.log('Can\'t open dialerRecents database', e);
    };

    // DB init
    this._openreq.onupgradeneeded = function re_onUpgradeNeeded() {
      var db = self._openreq.result;
      if (db.objectStoreNames.contains(self.STORENAME))
        db.deleteObjectStore(self.STORENAME);
      db.createObjectStore(self.STORENAME, { keyPath: 'date' });
    };

    this.render();
    this.startUpdatingDates();
  }