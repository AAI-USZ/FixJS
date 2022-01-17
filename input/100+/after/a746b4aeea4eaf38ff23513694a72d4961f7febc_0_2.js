function(binding) {

    // Variable in which the old class value is saved. The observer function
    // closes over this variable, so it knows which string to remove when
    // the property changes.
    var oldClass;

    var observer, invoker;

    var split = binding.split(':'),
        path = split[0],
        className = split[1],
        pathRoot = context,
        normalized;

    if (path !== '' && path !== 'this') {
      normalized = normalizePath(context, path, options.data);

      pathRoot = normalized.root;
      path = normalized.path;
    }

    // Set up an observer on the context. If the property changes, toggle the
    // class name.
    /** @private */
    observer = function() {
      // Get the current value of the property
      newClass = classStringForPath(pathRoot, path, className, options);
      elem = bindAttrId ? view.$("[data-bindattr-" + bindAttrId + "='" + bindAttrId + "']") : view.$();

      // If we can't find the element anymore, a parent template has been
      // re-rendered and we've been nuked. Remove the observer.
      if (elem.length === 0) {
        Ember.removeObserver(pathRoot, path, invoker);
      } else {
        // If we had previously added a class to the element, remove it.
        if (oldClass) {
          elem.removeClass(oldClass);
        }

        // If necessary, add a new class. Make sure we keep track of it so
        // it can be removed in the future.
        if (newClass) {
          elem.addClass(newClass);
          oldClass = newClass;
        } else {
          oldClass = null;
        }
      }
    };

    /** @private */
    invoker = function() {
      Ember.run.once(observer);
    };

    if (path !== '' && path !== 'this') {
      Ember.addObserver(pathRoot, path, invoker);
    }

    // We've already setup the observer; now we just need to figure out the
    // correct behavior right now on the first pass through.
    value = classStringForPath(pathRoot, path, className, options);

    if (value) {
      ret.push(value);

      // Make sure we save the current value so that it can be removed if the
      // observer fires.
      oldClass = value;
    }
  }