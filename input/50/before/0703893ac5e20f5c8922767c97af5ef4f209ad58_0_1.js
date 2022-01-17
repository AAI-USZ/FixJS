function(fileName, contents) {
      return this.storageImpl.setItem(fileName, JSON.stringify(contents));
    }