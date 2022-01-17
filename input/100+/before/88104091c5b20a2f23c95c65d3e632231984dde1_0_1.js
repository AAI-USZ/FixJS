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
      // If the views are an array, iterate and remove each individually.
      if (_.isArray(this.views[name])) {
        _.each(this.views[name], function(view) {
          view.remove();
        });
      // Otherwise it's a single view and can safely call remove.
      } else {
        this.views[name].remove();
      }
    }

    // Instance overrides take precedence, fallback to prototype options.
    options = view._options();

    // Set up the View.
    LayoutManager.setupView(view, options);

    // Custom template render function.
    view.render = function(done) {
      var viewDeferred = options.deferred();
      
      // Break this callback out so that its not duplicated inside the 
      // following safety try/catch.
      function renderCallback() {
        // This is needed because code is broken elsewhere to clean up stale
        // previously rendered views.
        //if (!view.__manager__.hasRendered) {
          if (options.partial(root.el, name, view.el, append)) {
            view.__manager__.hasRendered = true;
          }
        //}

        // Ensure DOM events are properly bound.
        view.delegateEvents();

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

      // Call the original render method.
      LayoutManager.prototype.render.call(view).then(renderCallback);

      return viewDeferred.promise();
    };

    // Set the prefix for a layout.
    if (!view._prefix && options.paths) {
      view._prefix = options.paths.template || "";
    }

    // Special logic for appending items. List items are represented as an
    // array.
    if (append) {
      // Start with an array if none exists.
      partials = this.views[name] = this.views[name] || [];
      
      if (!_.isArray(this.views[name])) {
        // Ensure this.views[name] is an array.
        partials = this.views[name] = [this.views[name]];
      }

      // Add the view to the list of partials.
      partials.push(view);

      return view;
    }

    // Assign to main views object and return for chainability.
    return this.views[name] = view;
  }