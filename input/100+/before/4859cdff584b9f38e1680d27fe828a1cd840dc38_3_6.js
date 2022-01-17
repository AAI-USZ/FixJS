function(view, options) {
    var proto = Backbone.LayoutManager.prototype;

    // Extend the options with the prototype and passed options.
    options = view.options = _.defaults(options || {}, proto.options);

    // Ensure necessary properties are set.
    _.defaults(view, {
      // Ensure a view always has a views object.
      views: {},

      // Internal state object used to store whether or not a View has been
      // taken over by layout manager and if it has been rendered into the DOM.
      __manager__: {}
    });

    // If the user provided their own render override, use that instead of the
    // default.
    if (this.render !== proto.render && !this._render) {
      this._render = this.render;
      this.render = proto.render;
    }

    // By default the original Remove function is the Backbone.View one.
    view._remove = Backbone.View.prototype.remove;

    // If the user provided their own remove override, use that instead of the
    // default.
    if (view.remove !== proto.remove) {
      view._remove = view.remove;
      view.remove = proto.remove;
    }
    
    // Default the prefix to an empty string.
    view._prefix = "";

    // Set the internal views
    if (options.views) {
      view.setViews(options.views);
    }

    // Ensure the template is mapped over
    if (view.template) {
      options.template = view.template;
    }
  }