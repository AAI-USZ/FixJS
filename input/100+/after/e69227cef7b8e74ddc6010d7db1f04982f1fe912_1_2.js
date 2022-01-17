function(name) {
      return !this.collection || 
             this.collection.isNameNew(name)
    }