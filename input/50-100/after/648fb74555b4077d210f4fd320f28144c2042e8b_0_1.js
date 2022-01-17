function(model) {
      var pass;
      pass = this.test(model) && this.getParentCollection().hasModel(model);
      if (pass) {
        this.safeAdd(model);
      } else {
        this.safeRemove(model);
      }
      return this;
    }