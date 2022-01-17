function InternalContext(parent, options) {
    this.parent = parent;
    this.options = options;
    this.cookies = this.parent.cookies;
  }