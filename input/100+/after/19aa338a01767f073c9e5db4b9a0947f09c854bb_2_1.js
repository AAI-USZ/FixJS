function(db) {
     
    var tx = trans.pull(db, osName, uuid, IDBTransaction.READ_WRITE),
        os = tx.objectStore(osName),
        remaining = keys.length,
        deleted = keys.length;

    while(keys.length > 0) {
      (function() {
        var key = keys.shift();
        var req = os.delete(key);
        req.onerror = errback;
        req.onsuccess = function(e) {
          remaining--;

          if(remaining === 0){
            callback.call(context, deleted);
          }
        };
      })();
    }

  }