function(db) {
     
    var tx = trans.pull(db, osName, uuid, IDBTransaction.READ_WRITE),
        os = tx.objectStore(osName),
        deleted = keys.length;

    while(keys.length > 0) {
      (function() {
        var key = keys.shift();
        var req = os.delete(key);
        req.onerror = errback;
        req.onsuccess = function(e) {
          if(keys.length === 0){
            callback.call(context, deleted);
          }
        };
      })();
    }

  }