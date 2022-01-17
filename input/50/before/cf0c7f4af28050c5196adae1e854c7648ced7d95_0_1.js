function (obj) {
        self.set(collection, obj._id, obj);
        self.flush();
      }