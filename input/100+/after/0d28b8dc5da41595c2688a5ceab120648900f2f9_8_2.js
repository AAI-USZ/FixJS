function(id, trans) {
      var store = this.db.getStore('Calendar');
      var related = store.remotesByAccount(id);
      var key;

      for (key in related) {
        store.remove(related[key]._id, trans);
      }
    }