function(fileName) {
      return JSON.parse(this.storageImpl.getItem(prefix + fileName));
    }