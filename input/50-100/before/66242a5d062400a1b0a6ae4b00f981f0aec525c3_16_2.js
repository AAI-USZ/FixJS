function(done) {
    var trans = db.transaction('accounts', 'readwrite');
    var accounts = trans.objectStore('accounts');
    var res = accounts.clear();

    res.onerror = function() {
      done(new Error('could not wipe accounts db'));
    }

    res.onsuccess = function() {
      done();
    }
  }