function fetchChanges() {
      txn = idb.transaction([DOC_STORE, BY_SEQ_STORE]);
      var req = descending
        ? txn.objectStore(BY_SEQ_STORE)
          .openCursor(IDBKeyRange.lowerBound(opts.seq, true), descending)
        : txn.objectStore(BY_SEQ_STORE)
          .openCursor(IDBKeyRange.lowerBound(opts.seq, true));
      req.onsuccess = onsuccess;
      req.onerror = onerror;
    }