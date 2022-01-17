function(database) {
      var txn = database.transaction(this.STORENAME, 'readwrite');
      var store = txn.objectStore(this.STORENAME);

      var setreq = store.put(recentCall);

      setreq.onsuccess = (function() {
        if (this.view) {
          var entry = this.createEntry(recentCall);
          var firstEntry = this.view.firstChild;
          this.view.insertBefore(entry, firstEntry);
        }
      }).bind(this);

      setreq.onerror = function(e) {
        console.log('dialerRecents add failure: ', e.message, setreq.errorCode);
      };
    }