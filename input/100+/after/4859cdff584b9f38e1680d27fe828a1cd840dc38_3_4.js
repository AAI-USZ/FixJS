function(done) {
    var root = this;
    var options = this._options();
    var viewDeferred = options.deferred();

    // Ensure duplicate renders don't override.
    if (root.__manager__.renderDeferred) {
      return root.__manager__.renderDeferred;
    }

    // Remove all the View's not marked for retention before rendering.
    _.each(this.views, function(view, selector) {
      // We only care about list items.
      if (!_.isArray(view)) {
        return;
      }

      // For every view in the array, remove the View and it's children.
      _.each(_.clone(view), function(subView, i) {
        // Look on the instance.
        var keep = subView.keep;

        // Fall back to the options object if it exists.
        if (!_.isBoolean(keep) && subView.options) {
          keep = subView.options.keep;
        }

        // Ensure keep: true is set for any View that has already rendered.
        if (subView.__manager__.hasRendered && !keep) {
          // Ensure the view is removed from the DOM.
          subView.remove();

          // Remove from the array.
          view.splice(i, 1);
        }
      });
    }, this);

    // Wait until this View has rendered before dealing with nested Views.
    this._render(LayoutManager._viewRender).fetch.then(function() {
      // Disable the ability for any new sub-views to be added.
      root.__manager__.renderDeferred = viewDeferred;

      // Create a list of promises to wait on until rendering is done. Since
      // this method will run on all children as well, its sufficient for a
      // full hierarchical. 
      var promises = _.map(root.views, function(view) {
        // Hoist deferred var, used later on...
        var def;

        // Ensure views are rendered in sequence
        function seqRender(views, done) {
          // Once all views have been rendered invoke the sequence render
          // callback.
          if (!views.length) {
            return done();
          }

          // Get each view in order, grab the first one off the stack.
          var view = views.shift();

          // This View is now managed by LayoutManager *toot*.
          view.__manager__.isManaged = true;

          // Render the View and once complete call the next view.
          view.render(function() {
            // Invoke the recursive sequence render function with the
            // remaining views.
            seqRender(views, done);
          });
        }

        // If rendering a list out, ensure they happen in a serial order.
        if (_.isArray(view)) {
          // A singular deferred that represents all the items.
          def = options.deferred();

          seqRender(_.clone(view), function() {
            def.resolve();
          });

          return def.promise();
        }

        // This View is now managed by LayoutManager.
        view.__manager__.isManaged = true;

        // Only return the fetch deferred, resolve the main deferred after
        // the element has been attached to it's parent.
        return view.render();
      });

      // Once all subViews have been rendered, resolve this View's deferred.
      options.when(promises).then(function() {
        viewDeferred.resolveWith(root, [root.el]);
      });
    });

    // Return a promise that resolves once all immediate subViews have
    // rendered.
    return viewDeferred.then(function() {
      // Only call the done function if a callback was provided.
      if (_.isFunction(done)) {
        done.call(root, root.el);
      }

      // Remove the rendered deferred.
      delete root.__manager__.renderDeferred;
    }).promise();
  }