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