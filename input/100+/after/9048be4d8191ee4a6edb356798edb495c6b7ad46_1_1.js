function(value) {
    this.ready = value;
    if (value && this.onReArranged) {
      this.onReArranged();
    }
  }