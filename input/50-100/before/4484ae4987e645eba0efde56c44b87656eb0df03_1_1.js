function(key, value) {
    var parentView, controller;

    if (arguments.length === 2) {
      return value;
    }

    if (VIEW_PRESERVES_CONTEXT) {
      if (controller = get(this, 'controller')) {
        return controller;
      }

      parentView = get(this, '_parentView');
      if (parentView) {
        return get(parentView, '_context');
      }
    }

    return this;
  }