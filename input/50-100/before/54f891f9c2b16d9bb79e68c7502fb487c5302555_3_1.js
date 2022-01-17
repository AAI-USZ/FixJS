function() {
      var id, newId;
      id = 'id-' + this.uniqueId;
      if (!this.waiters[id]) {
        return id;
      }
      if (this.uniqueId++ === MAX_WAITERS) {
        this.uniqueId = 1;
      }
      if (this.waiters[newId = 'id-' + this.uniqueId]) {
        delete this.waiters[newId];
      }
      return this.generateUniqueId();
    }