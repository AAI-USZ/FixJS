function(db) {
    
    var tx = trans.pull(db, osName, uuid, perm || IDBTransaction.READ_ONLY),
        idx = tx.objectStore(osName).index(indexName),
        keyRange = IDBKeyRange.only(value);

    idx.openCursor(keyRange).onsuccess = function(e) {
      var cursor = e.target.result;
      if(cursor && callback.call(context, cursor.value)) {
        cursor.continue();
      } else {
        callback.call(context);
      }
    };

  }