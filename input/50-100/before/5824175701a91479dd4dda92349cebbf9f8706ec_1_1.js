function(fileName) {
      var item;
      item = this.storageImpl.getItem(prefix + fileName);
      if (item != null) {
        try {
          return JSON.parse(item);
        } catch (e) {
          return null;
        }
      } else {
        return null;
      }
    }