function(name, view, append) {
    var partials, options;
    var root = this;

    // If no name was passed, use an empty string and shift all arguments.
    if (!_.isString(name)) {
      append = view;
      view = name;
      name = "";
    }

    // If the parent View's object, doesn't exist... create it.
    this.views = this.views || {};

    // Ensure remove is called when swapping View's.
    if (!append && this.views[name]) {
      this.views[name].remove();
    }

    // Instance overrides take precedence, fallback to prototype options.
    options = view._options();

    // Ensure render is set correctly.
    if (options.render !== LayoutManager.prototype.options.render) {
      view.render = options.render;
      options.render = LayoutManager.prototype.options.render;
    }

    // Set up the View.
    LayoutManager.setupView(view, options);

    // Add in all missing LayoutManager properties and methods.
    view._render = view.render;

    // If no render override was specified assign the default
    if (view.render === Backbone.View.prototype.render) {
      view._render = function(layout) {
        return layout(this).render();
      };
    }

    // Custom template render function.
    view.render = function(done) {
      var viewDeferred = options.deferred();
      
      // Break this callback out so that its not duplicated inside the 
      // following safety try/catch.
      function renderCallback() {
        // Only refresh the view if its not a list item, otherwise it would
        // cause duplicates.
        if (!view.__manager__.hasRendered) {
          // Only if the partial was successful.
          if (options.partial(root.el, name, view.el, append)) {
            // Set the internal rendered flag, since the View has finished
            // rendering.
            view.__manager__.hasRendered = true;
          }

          // Ensure DOM events are properly bound.
          view.delegateEvents();
        }

        // Resolve the View's render handler deferred.
        view.__manager__.handler.resolveWith(view, [view.el]);

        // When a view has been resolved, ensure that it is correctly updated
        // and that any done callbacks are triggered.
        viewDeferred.resolveWith(view, [view.el]);

        // Only call the done function if a callback was provided.
        if (_.isFunction(done)) {
          done.call(view, view.el);
        }
      }

      // Call the original render method
      LayoutManager.prototype.render.call(view).then(renderCallback);

      return viewDeferred.promise();
    };

    // Append View's get managed inside the render callback.
    if (!append) {
      view.__manager__.isManaged = true;
    }

    // Set the prefix for a layout.
    if (!view._prefix && options.paths) {
      view._prefix = options.paths.template || "";
    }

    // Special logic for appending items. List items are represented as an
    // array.
    if (append) {
      partials = this.views[name] = this.views[name] || [];
      
      if (!_.isArray(this.views[name])) {
        // Ensure this.views[name] is an array.
        partials = this.views[name] = [this.views[name]];
      }
      
      partials.push(view);

      return view;
    }

    // Assign to main views object and return for chainability.
    return this.views[name] = view;
  }