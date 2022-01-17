function (item, i) {
      if (item.getId() === itemToRemove.getId()) {
        debugger;
        self.remove(this); // fix lower level collections.
      }
    }