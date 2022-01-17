function(id, callback) {
      var self = this;
      var trans = this.db.transaction('accounts', 'readwrite');
      var store = trans.objectStore('accounts');

      var req = store.delete(parseInt(id));

      trans.onerror = function(event) {
        callback(event);
      }

      trans.oncomplete = function() {
        delete self._accounts[id];
        callback(null, id);
        self.emit('remove', id);
      }
    }