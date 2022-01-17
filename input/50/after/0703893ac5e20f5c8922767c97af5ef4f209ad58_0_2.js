function(fileName, contents) {
      return this.storageImpl.setItem(prefix + fileName, JSON.stringify(contents));
    }