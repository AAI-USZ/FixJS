function(key, value) {
    var parentView, context;

    if (arguments.length === 2) {
      return value;
    }

    if (VIEW_PRESERVES_CONTEXT) {
      if (Ember.meta(this).descs.controller !== controllerProperty) {
        if (context = get(this, 'controller')) {
          return context;
        }
      }

      parentView = get(this, '_parentView');
      if (parentView && (context = get(parentView, '_context'))) {
        return context;
      }
    }

    return this;
  }