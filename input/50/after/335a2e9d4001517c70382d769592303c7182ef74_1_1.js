function (attrs, opts) {
    if (!attrs) {
      attrs = {};
    }
    attrs["@type"] = "Person";
    this.set(attrs, opts);
  }