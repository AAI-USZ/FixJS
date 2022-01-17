function och_execute(action) {
    if (!this[action]) {
      this.end();
      return;
    }

    this[action]();
  }