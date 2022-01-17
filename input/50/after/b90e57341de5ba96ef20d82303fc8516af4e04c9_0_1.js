function(opts) {
    _.extend(LayoutManager.prototype.options, opts);

    // Allow LayoutManager to manage Backbone.View.prototype.
    if (opts.manage) {
      Backbone.View.prototype.manage = true;
    }
  }