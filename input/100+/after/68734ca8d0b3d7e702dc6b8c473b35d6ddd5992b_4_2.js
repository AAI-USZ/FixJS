function(err) {
      if (this.errors[this.errors.length - 1] !== err) {
        this.errors.push(err);
      }
      return this;
    }