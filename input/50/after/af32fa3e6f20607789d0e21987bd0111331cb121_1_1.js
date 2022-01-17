function(model, opts) {
    this.id = model.id;
    this.user = opts.collection.user;
    this.domain = opts.collection.domain.id;
  }