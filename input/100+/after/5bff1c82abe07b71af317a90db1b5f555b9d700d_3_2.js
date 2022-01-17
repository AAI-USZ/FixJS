function(view, attrs) {
    if (Ember.View.detect(view)) {
      if (attrs) {
        view = view.createWith({ _parentView: this }, attrs);
      } else {
        view = view.createWith({ _parentView: this });
      }

      var viewName = view.viewName;

      // don't set the property on a virtual view, as they are invisible to
      // consumers of the view API
      if (viewName) { set(get(this, 'concreteView'), viewName, view); }
    } else {
      ember_assert('must pass instance of View', view instanceof Ember.View);
      set(view, '_parentView', this);
    }
    return view;
  }