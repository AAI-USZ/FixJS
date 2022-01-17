function onerror() {
      callback(null);
      // Execute save operation again if failed.
      window.setTimeout(
        pendingMgr.deleteFromMsgDB(msg, callback).bind(pendingMgr), 500);
    }