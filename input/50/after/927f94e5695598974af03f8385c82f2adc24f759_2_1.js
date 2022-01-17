function (item, i) {
      if (item.getId() === itemToRemove.getId()) {
        self.remove(itemToRemove); // fix lower level collections.
      }
    }