function(view, options) {
    var proto = Backbone.LayoutManager.prototype;
    var keys = _.keys(LayoutManager.prototype.options);

    // Ensure necessary properties are set.
    _.defaults(view, {
      // Ensure a view always has a views object.
      views: {},

      // Internal state object used to store whether or not a View has been
      // taken over by layout manager and if it has been rendered into the DOM.
      __manager__: {}
    });

    // TODO Set the Views.
    if (view.options.views) {
      view.setViews(view.options.views);
    }

    // TODO Should not have to set this or the above.
    if (_.isBoolean(view.options.keep)) {
      view.keep = view.options.keep;
    }

    // TODO Should not have to set this or the above.
    if (view.options.afterRender) {
      view.afterRender = view.options.afterRender;
    }

    // Extend the options with the prototype and passed options.
    options = view.options = _.defaults(options || {}, proto.options);

    // Pick out the specific properties that can be dynamically added at
    // runtime and ensure they are available on the view object.
    _.extend(options, _.pick(this, keys));

    // Set the render if it is different from the Backbone.View.prototype.
    if (!(view instanceof LayoutManager)) {
      // Add the ability to remove all Views.
      view.removeView = LayoutManager.removeView;

      // Add options into the prototype.
      view._options = LayoutManager.prototype._options;

      if (view.render !== Backbone.View.prototype.render) {
        options.render = view.render;
      }
    }

    // Fix the LayoutManager issue with render.
    if (options.render === LayoutManager.prototype.render) {
      options.render = LayoutManager.prototype.options.render;
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