function renderCallback() {
        // This is needed because code is broken elsewhere to clean up stale
        // previously rendered views.
        options.partial(root.el, name, view.el, append);

        // Ensure DOM events are properly bound.
        view.delegateEvents();

        // Resolve the View's render handler deferred.
        view.__manager__.handler.resolveWith(view, [view.el]);
        delete view.__manager__.handler;

        // When a view has been resolved, ensure that it is correctly updated
        // and that any done callbacks are triggered.
        viewDeferred.resolveWith(view, [view.el]);

        // Only call the done function if a callback was provided.
        if (_.isFunction(done)) {
          done.call(view, view.el);
        }
      }