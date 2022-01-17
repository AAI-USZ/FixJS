function(model) {
      var pass;
      pass = this.test(model) && this.getParentCollection().test(model);
      if (pass) {
        this.safeAdd(model);
      } else {
        this.safeRemove(model);
      }
      return this;
    }