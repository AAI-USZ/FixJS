function(id) {
    for (var i = 0; i < this.steps.length; i++) {
      if (this.steps[i].id == id) { return i; }
    }
    return -1;
  }