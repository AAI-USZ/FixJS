function(opts) {
    _.extend(LayoutManager.prototype.options, opts);

    // Allow LayoutManager to augment Backbone.View.prototype.
    if (opts.augment) {
      Backbone.View.prototype.augment = true;
    }
  }