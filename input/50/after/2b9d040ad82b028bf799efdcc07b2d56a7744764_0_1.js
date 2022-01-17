function(name) {
      return !this.collection || 
             (this.collection && !this.collection.isNameExisting(name))
    }