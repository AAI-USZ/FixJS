function(view, attrs) {
    if (Ember.View.detect(view)) {
      view = view.create(attrs || {}, { _parentView: this });

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