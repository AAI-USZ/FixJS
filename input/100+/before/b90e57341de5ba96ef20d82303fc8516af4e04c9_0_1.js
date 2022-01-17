function(view, options) {
    var proto = Backbone.LayoutManager.prototype;
    var keys = _.keys(LayoutManager.prototype.options);

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

    // Pick out the specific properties that can be dynamically added at
    // runtime and ensure they are available on the view object.
    _.extend(options, _.pick(this, keys));

    // Set the render if it is different from the Backbone.View.prototype.
    if (view.render !== Backbone.View.prototype.render) {
      options.render = view.render;
    }

    // By default the original Remove function is the Backbone.View one.
    view._remove = Backbone.View.prototype.remove;

    // Always use this render function when using LayoutManager.
    view._render = function(manage) {
      // If a beforeRender function is defined, call it.
      if (_.isFunction(this.beforeRender)) {
        this.beforeRender.call(this, this);
      }

      // Always emit a beforeRender event.
      this.trigger("beforeRender", this);

      // Render!
      return manage(this).render().then(function() {
        // If an afterRender function is defined, call it.
        if (_.isFunction(this.afterRender)) {
          this.afterRender.call(this, this);
        }

        // Always emit an afterRender event.
        this.trigger("afterRender", this);
      });
    };

    // Ensure the render is always set correctly.
    view.render = LayoutManager.prototype.render;

    // If the user provided their own remove override, use that instead of the
    // default.
    if (view.remove !== proto.remove) {
      view._remove = view.remove;
      view.remove = proto.remove;
    }
    
    // Default the prefix to an empty string.
    view._prefix = "";

    // Set the internal views.
    if (options.views) {
      view.setViews(options.views);
    }

    // Ensure the template is mapped over.
    if (view.template) {
      options.template = view.template;
    }
  }