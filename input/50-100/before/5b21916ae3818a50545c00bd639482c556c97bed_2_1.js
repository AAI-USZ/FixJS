function() {
      this.trigger("dispose", this);
      return this.off();
    }