function(fileName) {
      return JSON.parse(this.storageImpl.getItem(fileName));
    }