function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== undefined) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, {silent: true, parse: options.parse});
  }